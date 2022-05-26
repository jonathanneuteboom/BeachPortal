from BeachPortalApi.Speler.Speler import Speler
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    naam = serializers.SerializerMethodField()

    class Meta:
        model = Speler
        fields = ['id', 'naam', 'is_staff']

    def get_naam(self, instance):
        return f'{instance.first_name} {instance.last_name}'
