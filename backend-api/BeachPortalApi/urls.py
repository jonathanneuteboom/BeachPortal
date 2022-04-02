from django.urls import path, include
from rest_framework import routers, urls
from BeachPortalApi.Authenticatie.CustomTokenGenerators import CustomAuthToken
from BeachPortalApi.Poule.ViewSets import PouleViewSet
from BeachPortalApi.Speelronde.ViewSets import SpeelrondeViewSet

from BeachPortalApi.Speler.ViewSets import UserViewSet
from BeachPortalApi.Wedstrijd.ViewSets import WedstrijdViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'spelers', UserViewSet)
router.register(r'wedstrijden', WedstrijdViewSet)
router.register(r'poules', PouleViewSet)
router.register(r'speelrondes', SpeelrondeViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),

    path('login', CustomAuthToken.as_view()),

    path('api-auth/', include(urls, namespace='rest_framework'))
]
