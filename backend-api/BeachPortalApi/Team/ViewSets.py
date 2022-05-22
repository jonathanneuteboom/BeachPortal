from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import generics
from rest_framework import status
from django.contrib.auth import get_user_model


from BeachPortalApi.Team.Serializers import TeamSerializer
from BeachPortalApi.Team.models import Team


class TeamsViewSet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = TeamSerializer(Team.objects.all(), many=True)
        return Response(serializer.data)


class TeamViewSet(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    serializer_class = TeamSerializer

    def post(self, request):
        if request.data.get('id') != None:
            team = Team.objects.get(pk=request.data.get('id'))
        else:
            team = Team()
            team.save()

        naam = request.data.get('naam')
        if not naam:
            return Response('Teamnaam mag niet leeg zijn', status.HTTP_400_BAD_REQUEST)

        categorie = request.data.get('categorie')
        if not categorie:
            return Response('Categorie mag niet leeg zijn', status.HTTP_400_BAD_REQUEST)

        spelers = filter(
            lambda speler: (
                speler.get('id') != None
            ), request.data.get('spelers')
        )
        spelerIds = list(map(lambda speler: speler.get('id'), spelers))
        spelers = get_user_model().objects.filter(pk__in=spelerIds)

        team.spelers.set(spelers)
        team.categorie = categorie
        team.naam = naam

        team.save()
        return Response()

    def delete(self, request, teamId):
        Team.objects.get(pk=teamId).delete()
        return Response()
