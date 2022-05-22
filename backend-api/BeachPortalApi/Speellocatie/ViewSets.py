from rest_framework.response import Response
from rest_framework import generics
from BeachPortalApi.Speellocatie.Serializer import SpeellocatieSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from BeachPortalApi.Speellocatie.models import Speellocatie


class GetAllSpeellocatiesViewSet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        locaties = Speellocatie.objects.all().order_by('naam')
        serializer = SpeellocatieSerializer(locaties, many=True)
        return Response(serializer.data)
