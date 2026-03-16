from django.db import models


AUDIENCE_CHILD = 'child'
AUDIENCE_ADULT = 'adult'
AUDIENCE_BOTH = 'both'
AUDIENCE_CHOICES = [
    (AUDIENCE_CHILD, 'Kinder / Children'),
    (AUDIENCE_ADULT, 'Erwachsene / Adults'),
    (AUDIENCE_BOTH, 'Alle / Both'),
]


class Category(models.Model):
    name_kmr = models.CharField(max_length=100, verbose_name='Kurmanji')
    name_de = models.CharField(max_length=100, verbose_name='German')
    name_en = models.CharField(max_length=100, verbose_name='English')

    icon = models.CharField(max_length=50, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    audience = models.CharField(
        max_length=10,
        choices=AUDIENCE_CHOICES,
        default=AUDIENCE_BOTH,
        verbose_name='Zielgruppe',
    )

    class Meta:
        ordering = ['order']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name_kmr


class Lesson(models.Model):
    LEVEL_A1 = 1
    LEVEL_A2 = 2
    LEVEL_B1 = 3
    LEVEL_B2 = 4
    LEVEL_C1 = 5
    LEVEL_C2 = 6
    LEVEL_CHOICES = [
        (LEVEL_A1, 'A1 — Destpêk'),
        (LEVEL_A2, 'A2 — Destpêkê Bilind'),
        (LEVEL_B1, 'B1 — Navîn'),
        (LEVEL_B2, 'B2 — Navînê Bilind'),
        (LEVEL_C1, 'C1 — Pêşketî'),
        (LEVEL_C2, 'C2 — Pispor'),
    ]

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='lessons')

    title_kmr = models.CharField(max_length=200, verbose_name='Kurmanji title')
    title_de = models.CharField(max_length=200, verbose_name='German title')
    title_en = models.CharField(max_length=200, verbose_name='English title')

    description_kmr = models.TextField(blank=True, verbose_name='Kurmanji description')
    description_de = models.TextField(blank=True, verbose_name='German description')
    description_en = models.TextField(blank=True, verbose_name='English description')

    level = models.PositiveSmallIntegerField(choices=LEVEL_CHOICES, default=LEVEL_A1)
    order = models.PositiveSmallIntegerField(default=0)
    thumbnail = models.ImageField(upload_to='lessons/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    audience = models.CharField(
        max_length=10,
        choices=AUDIENCE_CHOICES,
        default=AUDIENCE_BOTH,
        verbose_name='Zielgruppe',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category', 'level', 'order']
        verbose_name = 'Lesson'
        verbose_name_plural = 'Lessons'

    def __str__(self):
        return self.title_kmr


class Word(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='words')

    kmr = models.CharField(max_length=200, verbose_name='Kurmanji')
    emoji = models.CharField(max_length=10, blank=True, verbose_name='Emoji')
    pronunciation = models.CharField(max_length=200, blank=True, verbose_name='Pronunciation')
    audio_kmr = models.FileField(upload_to='audio/words/kmr/', null=True, blank=True)

    de = models.CharField(max_length=200, verbose_name='German')
    en = models.CharField(max_length=200, verbose_name='English')

    image = models.ImageField(upload_to='images/words/', null=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Word'
        verbose_name_plural = 'Words'

    def __str__(self):
        return f'{self.kmr} (de: {self.de} / en: {self.en})'
