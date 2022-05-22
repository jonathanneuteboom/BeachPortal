from django.contrib import admin

from BeachPortalApi.Poule.models import Poule
from BeachPortalApi.Speellocatie.models import Speellocatie
from BeachPortalApi.Speelronde.models import Speelronde
from BeachPortalApi.Team.models import Team
from BeachPortalApi.Wedstrijd.models import Wedstrijd

admin.site.register(Speelronde)
admin.site.register(Poule)
admin.site.register(Team)
admin.site.register(Wedstrijd)
admin.site.register(Speellocatie)
