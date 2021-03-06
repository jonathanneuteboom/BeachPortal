from BeachPortalApi.Speellocatie.Speellocatie import Speellocatie
from rest_framework import serializers


class SpeellocatieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speellocatie
        fields = ['id', 'naam']
