from BeachPortalApi.Joomla.Models import JoomlaUser
from BeachPortalApi.Speler.Serializers import UserSerializer
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from typing import Optional

from BeachPortalApi.Speler.Speler import Speler


class Querier():
    @staticmethod
    def get_joomla_user(input: str) -> Optional[JoomlaUser]:
        return JoomlaUser.objects.using('deb105013n2_SKC').filter(Q(email=input) | Q(username=input)).first()

    @staticmethod
    def get_django_user(input: str) -> Optional[Speler]:
        return Speler.objects.filter(
            Q(email=input) |
            Q(username=input)
        ).first()


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(user)
            return Response({'token': token.key, 'user': serializer.data})

        username_or_email = request.data.get('username')
        password = request.data.get('password')

        joomla_user = Querier.get_joomla_user(username_or_email)
        if (joomla_user is None):
            return Response({'error': 'Username/Email does not exist'}, status=401)

        if not joomla_user.verify_password(password):
            return Response({'error': 'Username/Password incorrect'}, status=401)

        user = Querier.get_django_user(username_or_email)
        if (user is None):
            user = Speler.create_user(
                joomla_user.username,
                joomla_user.email,
                password
            )
            user.save()
        elif authenticate(username=user.username, password=password) is None:
            # password is correct, but django user is not up-to-date
            user.set_password(password)
            user.save()

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'id': user.pk, 'username': user.username})


class LogoutViewSet(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Token.objects.get(user=request.user).delete()
        return Response()
