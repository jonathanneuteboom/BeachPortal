from BeachPortalApi.Wedstrijd.WedstrijdSerializers import WedstrijdSerializer
from BeachPortalApi.Wedstrijd.Wedstrijd import Wedstrijd
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


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
