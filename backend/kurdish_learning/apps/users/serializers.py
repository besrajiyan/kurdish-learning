from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'role', 'audience',
                  'interface_lang', 'birth_year')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Şifreler eşleşmiyor.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    is_premium = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'audience', 'interface_lang',
                  'avatar', 'birth_year', 'total_stars', 'date_joined',
                  'plan', 'plan_expires', 'is_premium')
        read_only_fields = ('id', 'total_stars', 'date_joined', 'plan', 'plan_expires', 'is_premium')


class UserPublicSerializer(serializers.ModelSerializer):
    """Başka kullanıcılara gösterilecek minimal profil."""
    class Meta:
        model = User
        fields = ('id', 'username', 'avatar', 'total_stars')
