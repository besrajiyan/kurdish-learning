from django.contrib import admin
from .models import Exercise, Choice


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 2
    fields = ('lang', 'text', 'is_correct', 'audio', 'image', 'order')


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'lesson', 'exercise_type', 'question_lang', 'stars', 'order')
    list_filter = ('exercise_type', 'question_lang', 'lesson__category')
    inlines = [ChoiceInline]
