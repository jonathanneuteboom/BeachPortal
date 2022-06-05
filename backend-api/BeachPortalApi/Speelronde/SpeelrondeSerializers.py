from BeachPortalApi.Poule.PouleSerializers import PouleSerializer
from BeachPortalApi.Speelronde.Speelronde import Speelronde
from rest_framework import serializers


class SpeelrondeSerializer(serializers.ModelSerializer):
    poules = serializers.SerializerMethodField()

    class Meta:
        model = Speelronde
        fields = ['id', 'nummer', 'poules']

    def get_poules(self, instance):
        poules = instance.poules.order_by('categorie', 'nummer')
        return PouleSerializer(poules, many=True).data
