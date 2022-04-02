from django.contrib import admin
from BeachPortalApi.Speelronde import models as Speelronde
from BeachPortalApi.Poule import models as Poule
from BeachPortalApi.Team import models as Team
from BeachPortalApi.Wedstrijd import models as Wedstrijd


admin.site.register(Speelronde.Speelronde)
admin.site.register(Poule.Poule)
admin.site.register(Team.Team)
admin.site.register(Wedstrijd.Wedstrijd)
