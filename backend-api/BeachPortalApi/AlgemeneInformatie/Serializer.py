
from rest_framework import serializers
from BeachPortalApi.AlgemeneInformatie.Models import Document

from BeachPortalApi.Poule.models import Poule


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
