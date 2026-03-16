from django.conf import settings
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Exercise, Choice
from .serializers import ExerciseSerializer, AnswerSubmitSerializer
from kurdish_learning.apps.progress.models import ExerciseAnswer, LessonProgress


class ExerciseViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Exercise.objects.prefetch_related('choices').select_related('lesson')
        lesson_id = self.request.query_params.get('lesson')
        if lesson_id:
            qs = qs.filter(lesson_id=lesson_id)
        return qs

    def list(self, request, *args, **kwargs):
        lesson_id = request.query_params.get('lesson')
        if lesson_id:
            from kurdish_learning.apps.lessons.models import Lesson
            try:
                lesson = Lesson.objects.get(pk=lesson_id)
                if lesson.level > settings.FREE_MAX_LEVEL and not request.user.is_premium:
                    return Response(
                        {'detail': 'Premium required', 'code': 'premium_required'},
                        status=status.HTTP_403_FORBIDDEN,
                    )
            except Lesson.DoesNotExist:
                pass
        return super().list(request, *args, **kwargs)

    @action(detail=False, methods=['post'], url_path='answer')
    def submit_answer(self, request):
        serializer = AnswerSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        exercise_id = serializer.validated_data['exercise_id']
        choice_id = serializer.validated_data['choice_id']

        try:
            exercise = Exercise.objects.get(pk=exercise_id)
            choice = Choice.objects.get(pk=choice_id, exercise=exercise)
        except (Exercise.DoesNotExist, Choice.DoesNotExist):
            return Response({'detail': 'Geçersiz alıştırma veya seçenek.'}, status=status.HTTP_404_NOT_FOUND)

        is_correct = choice.is_correct

        ExerciseAnswer.objects.create(
            user=request.user,
            exercise=exercise,
            is_correct=is_correct,
        )

        # Doğruysa yıldız ekle ve ders ilerlemesini güncelle
        if is_correct:
            request.user.total_stars += exercise.stars
            request.user.save(update_fields=['total_stars'])

            progress, _ = LessonProgress.objects.get_or_create(
                user=request.user,
                lesson=exercise.lesson,
            )
            progress.stars_earned += exercise.stars

            # Dersin tüm alıştırmaları tamamlandıysa dersi bitir
            answered_ids = set(
                ExerciseAnswer.objects.filter(
                    user=request.user,
                    exercise__lesson=exercise.lesson,
                    is_correct=True,
                ).values_list('exercise_id', flat=True)
            )
            total = exercise.lesson.exercises.count()
            if len(answered_ids) >= total:
                progress.is_completed = True
                progress.completed_at = timezone.now()

            progress.save()

        return Response({
            'is_correct': is_correct,
            'stars_earned': exercise.stars if is_correct else 0,
            'total_stars': request.user.total_stars,
        })
