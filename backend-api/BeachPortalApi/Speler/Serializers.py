from django.contrib.auth import get_user_model

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    naam = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'naam', 'is_staff']

    def get_naam(self, instance):
        return f'{instance.first_name} {instance.last_name}'
