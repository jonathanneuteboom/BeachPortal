from django.urls import include, path
from rest_framework import urls

from BeachPortalApi.AlgemeenKlassement.AlgemeenKlassementViewSets import \
    AlgemeenKlassementViewSet
from BeachPortalApi.AlgemeneInformatie.Views import AlgemeneInformatieViewSet
from BeachPortalApi.Authenticatie.CustomTokenGenerators import (
    CustomAuthToken, LogoutViewSet)
from BeachPortalApi.Authenticatie.ImporteerSkc import ImporteerSkc
from BeachPortalApi.Email.EmailViewSet import SendEmailsViewSet
from BeachPortalApi.Poule.PouleViewSets import (MyPoulesView, NewPouleViewSet,
                                                OverlappingPouleViewSet,
                                                PouleTeamViewSet, PouleViewSet)
from BeachPortalApi.Speellocatie.SpeellocatieViewSets import GetAllSpeellocatiesViewSet
from BeachPortalApi.Speelronde.ViewSets import (CreateSpeelrondeViewSet,
                                                DeleteSpeelrondeViewSet,
                                                GetAllSpeelrondesViewSet,
                                                GetCurrentSpeelrondeViewSet)
from BeachPortalApi.Speler.SpelerViewSets import CurrentUserView, GetSpelerByName
from BeachPortalApi.Team.TeamViewSets import TeamsViewSet, TeamViewSet
from BeachPortalApi.Wedstrijd.WedstrijdViewSets import WedstrijdViewSets

urlpatterns = [
    path('user/login', CustomAuthToken.as_view()),
    path('user/logout', LogoutViewSet.as_view()),
    path('user/current', CurrentUserView.as_view()),
    path('user/find-by-name', GetSpelerByName.as_view()),

    path('algemene-informatie', AlgemeneInformatieViewSet.as_view()),

    path('algemeen-klassement', AlgemeenKlassementViewSet.as_view()),

    path('speelronde/add',  CreateSpeelrondeViewSet.as_view()),
    path('speelronde/delete',  DeleteSpeelrondeViewSet.as_view()),
    path('speelronde/current', GetCurrentSpeelrondeViewSet.as_view()),
    path('speelronde/all',  GetAllSpeelrondesViewSet.as_view()),

    path('speellocaties', GetAllSpeellocatiesViewSet.as_view()),

    path('team', TeamViewSet.as_view()),
    path('team/<int:teamId>/', TeamViewSet.as_view()),
    path('teams', TeamsViewSet.as_view()),

    path('poule', NewPouleViewSet.as_view()),
    path('poule/<int:pouleId>/', PouleViewSet.as_view()),
    path('poule/my', MyPoulesView.as_view()),
    path('poule/overlap', OverlappingPouleViewSet.as_view()),
    path('poule/<int:pouleId>/team/<int:teamId>/', PouleTeamViewSet.as_view()),

    path('management/importeer-skc', ImporteerSkc.as_view()),

    path('wedstrijd/<int:wedstrijdId>/', WedstrijdViewSets.as_view()),

    path('email/send', SendEmailsViewSet.as_view()),

    path('api-auth/', include(urls, namespace='rest_framework'))
]
