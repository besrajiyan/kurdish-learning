from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Sum
from .models import LessonProgress, ExerciseAnswer
from .serializers import LessonProgressSerializer
from kurdish_learning.apps.users.models import User


class MyProgressView(generics.ListAPIView):
    serializer_class = LessonProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return LessonProgress.objects.filter(
            user=self.request.user
        ).select_related('lesson').order_by('-last_accessed')


class ChildProgressView(APIView):
    """Ebeveyn, bağlı çocuğun ilerlemesini görür."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, child_id):
        # Sadece kendi çocuğuna erişebilir
        try:
            child = User.objects.get(pk=child_id, parent=request.user)
        except User.DoesNotExist:
            return Response({'detail': 'Çocuk bulunamadı.'}, status=status.HTTP_404_NOT_FOUND)

        progress = LessonProgress.objects.filter(
            user=child
        ).select_related('lesson__category').order_by('-last_accessed')

        answers = ExerciseAnswer.objects.filter(user=child)
        total_answers = answers.count()
        correct_answers = answers.filter(is_correct=True).count()

        return Response({
            'child': {
                'id': child.id,
                'username': child.username,
                'total_stars': child.total_stars,
                'avatar': request.build_absolute_uri(child.avatar.url) if child.avatar else None,
            },
            'stats': {
                'lessons_completed': progress.filter(is_completed=True).count(),
                'lessons_started': progress.count(),
                'total_answers': total_answers,
                'correct_answers': correct_answers,
                'accuracy': round(correct_answers / total_answers * 100) if total_answers else 0,
            },
            'lesson_progress': LessonProgressSerializer(progress, many=True).data,
        })


class MyChildrenView(APIView):
    """Ebeveyn, kendi çocuklarının listesini görür."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'parent':
            return Response({'detail': 'Sadece ebeveynler bu endpoint\'i kullanabilir.'},
                            status=status.HTTP_403_FORBIDDEN)
        children = request.user.children.all()
        return Response([{
            'id': c.id,
            'username': c.username,
            'total_stars': c.total_stars,
            'avatar': request.build_absolute_uri(c.avatar.url) if c.avatar else None,
            'lessons_completed': LessonProgress.objects.filter(user=c, is_completed=True).count(),
        } for c in children])
