from rest_framework import serializers
from .models import LessonProgress, ExerciseAnswer


class LessonProgressSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source='lesson.title_kmr', read_only=True)

    class Meta:
        model = LessonProgress
        fields = ('id', 'lesson', 'lesson_title', 'is_completed',
                  'stars_earned', 'completed_at', 'last_accessed')
        read_only_fields = ('id', 'is_completed', 'stars_earned', 'completed_at', 'last_accessed')


class ExerciseAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseAnswer
        fields = ('id', 'exercise', 'is_correct', 'answered_at')
        read_only_fields = ('id', 'is_correct', 'answered_at')
