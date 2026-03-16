from django.db import models
from kurdish_learning.apps.lessons.models import Lesson

LANG_KMR = 'kmr'
LANG_DE = 'de'
LANG_EN = 'en'
LANG_CHOICES = [
    (LANG_KMR, 'Kurmanci'),
    (LANG_DE, 'Almanca'),
    (LANG_EN, 'İngilizce'),
]


class Exercise(models.Model):
    TYPE_MULTIPLE_CHOICE = 'multiple_choice'   # Çoktan seçmeli
    TYPE_MATCHING = 'matching'                  # Eşleştirme
    TYPE_FILL_BLANK = 'fill_blank'             # Boşluk doldurma
    TYPE_LISTEN_SELECT = 'listen_select'       # Dinle ve seç (Kurmanci ses)
    TYPE_CHOICES = [
        (TYPE_MULTIPLE_CHOICE, 'Çoktan Seçmeli'),
        (TYPE_MATCHING, 'Eşleştirme'),
        (TYPE_FILL_BLANK, 'Boşluk Doldurma'),
        (TYPE_LISTEN_SELECT, 'Dinle ve Seç'),
    ]

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='exercises')
    exercise_type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    # Soru hangi dilde sorulacak (de veya en)
    question_lang = models.CharField(
        max_length=3,
        choices=LANG_CHOICES,
        default=LANG_DE,
        verbose_name='Soru dili',
    )
    question = models.TextField(verbose_name='Soru')
    question_audio = models.FileField(upload_to='audio/questions/', null=True, blank=True)
    question_image = models.ImageField(upload_to='images/questions/', null=True, blank=True)

    order = models.PositiveSmallIntegerField(default=0)
    stars = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ['order']
        verbose_name = 'Alıştırma'
        verbose_name_plural = 'Alıştırmalar'

    def __str__(self):
        return f'[{self.get_exercise_type_display()}] {self.question[:50]}'


class Choice(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='choices')

    # Cevap Kurmanci olabilir (öğrenilen dil) veya kaynak dil olabilir
    lang = models.CharField(max_length=3, choices=LANG_CHOICES, default=LANG_KMR)
    text = models.CharField(max_length=300)
    audio = models.FileField(upload_to='audio/choices/', null=True, blank=True)
    image = models.ImageField(upload_to='images/choices/', null=True, blank=True)
    is_correct = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Seçenek'
        verbose_name_plural = 'Seçenekler'

    def __str__(self):
        return f'[{self.lang}] {self.text} ({"doğru" if self.is_correct else "yanlış"})'
