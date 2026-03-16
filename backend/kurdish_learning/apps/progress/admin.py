from django.contrib import admin
from .models import LessonProgress, ExerciseAnswer


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'is_completed', 'stars_earned', 'last_accessed')
    list_filter = ('is_completed',)


@admin.register(ExerciseAnswer)
class ExerciseAnswerAdmin(admin.ModelAdmin):
    list_display = ('user', 'exercise', 'is_correct', 'answered_at')
    list_filter = ('is_correct',)
