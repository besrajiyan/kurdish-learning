from rest_framework import serializers
from .models import Exercise, Choice


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'lang', 'text', 'audio', 'image', 'order')
        # is_correct frontend'e gönderilmez — cevap kontrolü backend'de


class ExerciseSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = ('id', 'exercise_type', 'question_lang', 'question',
                  'question_audio', 'question_image', 'order', 'stars', 'choices')


class AnswerSubmitSerializer(serializers.Serializer):
    exercise_id = serializers.IntegerField()
    choice_id = serializers.IntegerField()
