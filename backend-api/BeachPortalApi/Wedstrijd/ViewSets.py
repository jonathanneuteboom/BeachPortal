from rest_framework import viewsets
from BeachPortalApi.Wedstrijd.Serializers import WedstrijdSerializer

from BeachPortalApi.Wedstrijd.models import Wedstrijd


class WedstrijdViewSet(viewsets.ModelViewSet):
    queryset = Wedstrijd.objects.all()
    serializer_class = WedstrijdSerializer
