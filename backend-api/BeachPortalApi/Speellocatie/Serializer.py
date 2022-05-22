from rest_framework import serializers

from BeachPortalApi.Speellocatie.models import Speellocatie


class SpeellocatieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speellocatie
        fields = ['id', 'naam']
