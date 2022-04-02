
from rest_framework import serializers

from BeachPortalApi.Speelronde.models import Speelronde


class SpeelrondeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speelronde
        fields = '__all__'
