from django.db import models
from django.conf import settings
from kurdish_learning.apps.lessons.models import Lesson
from kurdish_learning.apps.exercises.models import Exercise


class LessonProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progress')
    is_completed = models.BooleanField(default=False)
    stars_earned = models.PositiveSmallIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    last_accessed = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'lesson')
        verbose_name = 'Ders İlerlemesi'
        verbose_name_plural = 'Ders İlerlemeleri'

    def __str__(self):
        return f'{self.user} — {self.lesson}'


class ExerciseAnswer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='answers')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='answers')
    is_correct = models.BooleanField()
    answered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Alıştırma Cevabı'
        verbose_name_plural = 'Alıştırma Cevapları'

    def __str__(self):
        return f'{self.user} — {"doğru" if self.is_correct else "yanlış"}'
