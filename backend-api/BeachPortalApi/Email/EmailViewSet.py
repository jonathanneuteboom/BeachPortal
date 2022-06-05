from BeachPortalApi.Poule.Poule import Poule
from BeachPortalApi.Team.models import Team
from rest_framework import generics, serializers
from rest_framework.response import Response


class SendMailSerializer(serializers.Serializer):
    isTestMail = serializers.BooleanField(allow_null=True, default=False)
    title = serializers.CharField()
    message = serializers.CharField()
    poules = serializers.ListField(
        child=serializers.IntegerField(), allow_null=True)
    teams = serializers.ListField(
        child=serializers.IntegerField(), allow_null=True)


class SendEmailsViewSet(generics.CreateAPIView):
    placeholders = ["NAAM", "DATUM", "POULE",
                    "TIJD", "LOCATIE", "TEAMS", "SPEELRONDE"]

    def post(self, request):
        serializer = SendMailSerializer(data=request.data)
        if not serializer.is_valid():
            return Response("error")

        pouleIds = serializer.data.get('poules') or []
        teamIds = serializer.data.get('teams') or []
        title = serializer.data.get('title')
        message = serializer.data.get('message')
        isTestMail = serializer.data.get('isTestMail')

        emails = []

        if len(pouleIds) > 0 and len(teamIds) > 0:
            return Response("Je kan niet naar Teams en Poules tegelijk sturen")

        if len(pouleIds):
            poules = Poule.objects.filter(id__in=pouleIds)
            for poule in poules:
                newEmails = poule.generateEmails(title, message)
                emails = emails+newEmails

        if len(teamIds):
            teams = Team.objects.filter(id__in=teamIds)
            for team in teams:
                newEmails = team.generateEmails(title, message)
                emails = emails+newEmails

        if len(emails) == 0:
            return Response("Geen emails")

        if any(not email.isValid() for email in emails):
            return Response("Een van de emails is fout")

        if isTestMail:
            emails[0].sendTestMail()
            return Response("Test mail verzonden")

        numberOfSentEmails = 0
        for email in emails:
            isSent = email.send()
            if isSent:
                numberOfSentEmails += 1

        return Response(f"Alle {numberOfSentEmails} mails zijn verzonden")
