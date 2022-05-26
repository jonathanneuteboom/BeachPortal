from BeachPortalApi.Speler.Serializers import UserSerializer
from BeachPortalApi.Speler.Speler import Speler
from django.db.models import Q
from rest_framework import status, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CurrentUserView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated is False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class GetSpelerByName(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Speler.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        suffix = request.GET.get('naam', '')
        users = self.queryset.filter(
            Q(first_name__istartswith=suffix) |
            Q(last_name__istartswith=suffix)
        )[:5]
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
