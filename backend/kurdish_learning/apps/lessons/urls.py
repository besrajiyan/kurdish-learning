from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, LessonViewSet, upload_word_audio, list_words_for_recording

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('', LessonViewSet, basename='lesson')

urlpatterns = [
    path('words/recording-list/', list_words_for_recording, name='word-recording-list'),
    path('words/<int:word_id>/upload-audio/', upload_word_audio, name='word-upload-audio'),
    path('', include(router.urls)),
]
