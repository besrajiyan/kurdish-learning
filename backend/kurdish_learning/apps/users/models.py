from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    ROLE_CHILD = 'child'
    ROLE_PARENT = 'parent'
    ROLE_CHOICES = [
        (ROLE_CHILD, 'Child / Zarok'),
        (ROLE_PARENT, 'Parent / Dêûbav'),
    ]

    AUDIENCE_CHILD = 'child'
    AUDIENCE_ADULT = 'adult'
    AUDIENCE_CHOICES = [
        (AUDIENCE_CHILD, 'Kinder / Children'),
        (AUDIENCE_ADULT, 'Erwachsene / Adults'),
    ]

    LANG_DE = 'de'
    LANG_EN = 'en'
    LANG_CHOICES = [
        (LANG_DE, 'Deutsch'),
        (LANG_EN, 'English'),
    ]

    PLAN_FREE = 'free'
    PLAN_PREMIUM = 'premium'
    PLAN_CHOICES = [
        (PLAN_FREE, 'Free'),
        (PLAN_PREMIUM, 'Premium'),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=ROLE_CHILD)
    audience = models.CharField(
        max_length=10,
        choices=AUDIENCE_CHOICES,
        default=AUDIENCE_CHILD,
        verbose_name='Zielgruppe / Target audience',
    )
    interface_lang = models.CharField(
        max_length=2,
        choices=LANG_CHOICES,
        default=LANG_DE,
        verbose_name='Interface language',
    )
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    birth_year = models.PositiveSmallIntegerField(null=True, blank=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='children',
        limit_choices_to={'role': ROLE_PARENT},
    )
    total_stars = models.PositiveIntegerField(default=0)

    # Subscription
    plan = models.CharField(max_length=10, choices=PLAN_CHOICES, default=PLAN_FREE)
    plan_expires = models.DateTimeField(null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True, default='')

    @property
    def is_premium(self):
        if self.plan != self.PLAN_PREMIUM:
            return False
        if self.plan_expires and self.plan_expires < timezone.now():
            return False
        return True

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username
