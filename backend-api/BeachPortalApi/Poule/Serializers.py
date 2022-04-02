
from rest_framework import serializers

from BeachPortalApi.Poule.models import Poule


class PouleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poule
        fields = '__all__'
