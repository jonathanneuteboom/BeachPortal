from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from django.db.models import Q

from BeachPortalApi.Speler.Serializers import UserSerializer
from rest_framework.views import APIView


class CurrentUserView(APIView):
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
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        suffix = request.GET.get('naam', '')
        users = get_user_model().objects.filter(
            Q(first_name__istartswith=suffix) |
            Q(last_name__istartswith=suffix)
        )[:5]
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
