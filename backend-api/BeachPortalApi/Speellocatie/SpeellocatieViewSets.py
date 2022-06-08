from BeachPortalApi.Speellocatie.Speellocatie import Speellocatie
from BeachPortalApi.Speellocatie.SpeellocatieSerializer import \
    SpeellocatieSerializer
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class GetAllSpeellocatiesViewSet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        locaties = Speellocatie.objects.all().order_by('naam')
        serializer = SpeellocatieSerializer(locaties, many=True)
        return Response(serializer.data)
