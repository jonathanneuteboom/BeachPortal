from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from rest_framework import generics
from BeachPortalApi.Wedstrijd.Serializers import WedstrijdSerializer

from BeachPortalApi.Wedstrijd.models import Wedstrijd


class WedstrijdViewSets(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Wedstrijd.objects.all()
    serializer_class = WedstrijdSerializer

    def put(self, request, wedstrijdId):
        wedstrijd = get_object_or_404(Wedstrijd, id=wedstrijdId)
        wedstrijd.puntenTeam1 = request.data.get('puntenTeam1')
        wedstrijd.puntenTeam2 = request.data.get('puntenTeam2')
        wedstrijd.save()
        return Response()
