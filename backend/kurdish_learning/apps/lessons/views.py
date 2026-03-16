from django.conf import settings
from django.db.models import Prefetch
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes as perm_dec, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from .models import Category, Lesson, Word
from .serializers import CategorySerializer, LessonListSerializer, LessonDetailSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        audience = self.request.query_params.get('audience')
        lesson_qs = Lesson.objects.filter(is_active=True)
        if audience in ('child', 'adult'):
            lesson_qs = lesson_qs.filter(audience__in=[audience, 'both'])

        qs = Category.objects.prefetch_related(
            Prefetch('lessons', queryset=lesson_qs)
        ).all()

        if audience in ('child', 'adult'):
            qs = qs.filter(audience__in=[audience, 'both'])
        return qs


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Lesson.objects.filter(is_active=True).select_related('category')
        category = self.request.query_params.get('category')
        level = self.request.query_params.get('level')
        audience = self.request.query_params.get('audience')
        if category:
            qs = qs.filter(category_id=category)
        if level:
            qs = qs.filter(level=level)
        if audience in ('child', 'adult'):
            qs = qs.filter(audience__in=[audience, 'both'])
        return qs

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LessonDetailSerializer
        return LessonListSerializer

    def retrieve(self, request, *args, **kwargs):
        lesson = self.get_object()
        # Gate premium content
        if lesson.level > settings.FREE_MAX_LEVEL:
            if not request.user.is_authenticated or not request.user.is_premium:
                return Response(
                    {'detail': 'Premium required', 'code': 'premium_required'},
                    status=status.HTTP_403_FORBIDDEN,
                )
        return super().retrieve(request, *args, **kwargs)


@api_view(['POST'])
@perm_dec([permissions.IsAdminUser])
@parser_classes([MultiPartParser])
def upload_word_audio(request, word_id):
    """Upload audio recording for a word (admin only)."""
    try:
        word = Word.objects.get(id=word_id)
    except Word.DoesNotExist:
        return Response({'error': 'Word not found'}, status=status.HTTP_404_NOT_FOUND)

    audio_file = request.FILES.get('audio')
    if not audio_file:
        return Response({'error': 'No audio file'}, status=status.HTTP_400_BAD_REQUEST)

    # Delete old file if exists
    if word.audio_kmr:
        word.audio_kmr.delete(save=False)

    word.audio_kmr = audio_file
    word.save(update_fields=['audio_kmr'])

    return Response({
        'id': word.id,
        'kmr': word.kmr,
        'audio_kmr': request.build_absolute_uri(word.audio_kmr.url),
    })


@api_view(['GET'])
@perm_dec([permissions.IsAdminUser])
def list_words_for_recording(request):
    """List all words with their recording status (admin only)."""
    words = Word.objects.select_related('lesson').order_by('lesson__level', 'lesson__order', 'order')
    data = []
    for w in words:
        data.append({
            'id': w.id,
            'kmr': w.kmr,
            'emoji': w.emoji,
            'pronunciation': w.pronunciation,
            'de': w.de,
            'en': w.en,
            'has_audio': bool(w.audio_kmr),
            'audio_url': request.build_absolute_uri(w.audio_kmr.url) if w.audio_kmr else None,
            'lesson_title': w.lesson.title_kmr,
            'level': w.lesson.level,
        })
    return Response(data)
