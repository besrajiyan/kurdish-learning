from django.contrib import admin
from .models import Category, Lesson, Word


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name_kmr', 'name_de', 'name_en', 'icon', 'order')
    ordering = ('order',)


class WordInline(admin.TabularInline):
    model = Word
    extra = 1
    fields = ('kmr', 'pronunciation', 'de', 'en', 'audio_kmr', 'image', 'order')


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title_kmr', 'title_de', 'title_en', 'category', 'level', 'order', 'is_active')
    list_filter = ('category', 'level', 'is_active')
    inlines = [WordInline]
    fieldsets = (
        ('Kurmanci (asıl içerik)', {'fields': ('title_kmr', 'description_kmr')}),
        ('Almanca', {'fields': ('title_de', 'description_de')}),
        ('İngilizce', {'fields': ('title_en', 'description_en')}),
        ('Ayarlar', {'fields': ('category', 'level', 'order', 'thumbnail', 'is_active')}),
    )


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ('kmr', 'pronunciation', 'de', 'en', 'lesson')
    list_filter = ('lesson__category',)
    search_fields = ('kmr', 'de', 'en')
