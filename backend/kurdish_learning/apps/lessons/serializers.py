from django.conf import settings
from rest_framework import serializers
from .models import Category, Lesson, Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'kmr', 'emoji', 'pronunciation', 'audio_kmr', 'de', 'en', 'image', 'order')


class LessonListSerializer(serializers.ModelSerializer):
    """Ders listesi icin ozet — kelimeler dahil degil."""
    word_count = serializers.IntegerField(source='words.count', read_only=True)
    requires_premium = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ('id', 'title_kmr', 'title_de', 'title_en',
                  'level', 'order', 'thumbnail', 'is_active', 'audience',
                  'word_count', 'requires_premium')

    def get_requires_premium(self, obj):
        return obj.level > settings.FREE_MAX_LEVEL


class LessonDetailSerializer(serializers.ModelSerializer):
    """Ders detayi — kelimeler dahil."""
    words = WordSerializer(many=True, read_only=True)
    requires_premium = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ('id', 'title_kmr', 'title_de', 'title_en',
                  'description_kmr', 'description_de', 'description_en',
                  'level', 'order', 'thumbnail', 'is_active', 'audience',
                  'words', 'requires_premium')

    def get_requires_premium(self, obj):
        return obj.level > settings.FREE_MAX_LEVEL


class CategorySerializer(serializers.ModelSerializer):
    lessons = LessonListSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name_kmr', 'name_de', 'name_en', 'icon', 'order', 'audience', 'lessons')
