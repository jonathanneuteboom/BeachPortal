
from rest_framework import serializers

from BeachPortalApi.Wedstrijd.models import Wedstrijd


class WedstrijdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedstrijd
        fields = '__all__'
