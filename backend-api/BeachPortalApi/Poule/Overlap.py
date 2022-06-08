from BeachPortalApi.Poule.PouleSerializers import PouleSerializer
from BeachPortalApi.Poule.Poule import Poule
from BeachPortalApi.Speler.SpelerSerializers import UserSerializer
from BeachPortalApi.Speler.Speler import Speler
from rest_framework import serializers
from typing import List


class Overlap():
    poule1: Poule
    poule2: Poule
    spelers: List[Speler]

    def __init__(self, poule1, poule2, spelers):
        self.poule1 = poule1
        self.poule2 = poule2
        self.spelers = spelers


class OverlapSerializer(serializers.Serializer):
    poule1 = PouleSerializer()
    poule2 = PouleSerializer()
    spelers = UserSerializer(many=True)
