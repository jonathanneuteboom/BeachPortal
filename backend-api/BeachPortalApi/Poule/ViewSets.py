from rest_framework import viewsets

from BeachPortalApi.Poule.Serializers import PouleSerializer
from BeachPortalApi.Poule.models import Poule


class PouleViewSet(viewsets.ModelViewSet):
    queryset = Poule.objects.all()
    serializer_class = PouleSerializer
