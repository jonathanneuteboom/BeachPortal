
from BeachPortalApi.AlgemeneInformatie.Models import Document
from rest_framework import serializers


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
