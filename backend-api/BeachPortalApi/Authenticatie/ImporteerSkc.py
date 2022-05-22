from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from BeachPortalApi.Joomla.Models import JoomlaUser
from django.db.models import Q
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser


class ImporteerSkc(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = get_user_model()

    def post(self, request):
        emails = map(
            lambda x: x[0],
            self.queryset.objects.all().values_list('email')
        )

        missingUsers = JoomlaUser.objects.using(
            'deb105013n2_SKC'
        ).filter(
            ~Q(email__in=emails),
            ~Q(username='admin')
        ).all()
        for missingUser in missingUsers:
            name = missingUser.name.split()
            first_name = name[0]
            last_name = name[1] if len(name) > 1 else ''

            if (first_name == 'admin'):
                continue

            self.queryset.objects.create_user(
                missingUser.username,
                missingUser.email,
                None,
                first_name=first_name,
                last_name=last_name
            )

        return Response(f'{missingUsers.count()} nieuwe gebruikers aangemaakt')
