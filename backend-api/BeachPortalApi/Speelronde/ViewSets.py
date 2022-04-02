from rest_framework import viewsets

from BeachPortalApi.Speelronde.Serializers import SpeelrondeSerializer
from BeachPortalApi.Speelronde.models import Speelronde


class SpeelrondeViewSet(viewsets.ModelViewSet):
    queryset = Speelronde.objects.all()
    serializer_class = SpeelrondeSerializer
