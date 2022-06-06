from __future__ import annotations

from BeachPortalApi.AlgemeenKlassement.AlgemeenKlassementItem import \
    AlgemeenKlassementItemSerializer
from rest_framework import serializers


class AlgemeenKlassement():
    categorie = None
    ranking = []

    def __init__(self, categorie, ranking):
        self.categorie = categorie
        self.ranking = ranking


class AlgemeenKlassementSerializer(serializers.Serializer):
    categorie = serializers.CharField(source='categorie.label')
    ranking = AlgemeenKlassementItemSerializer(many=True)
