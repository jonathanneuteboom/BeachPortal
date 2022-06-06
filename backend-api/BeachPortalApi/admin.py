from BeachPortalApi.Poule.Poule import Poule
from BeachPortalApi.Speellocatie.models import Speellocatie
from BeachPortalApi.Speelronde.Speelronde import Speelronde
from BeachPortalApi.Speler.Speler import Speler
from BeachPortalApi.Team.Team import Team
from BeachPortalApi.Wedstrijd.Wedstrijd import Wedstrijd
from django.contrib import admin
from django.utils.translation import gettext_lazy as _


class AdminSpeler(admin.ModelAdmin):
    search_fields = [
        'username',
        'email',
        'first_name',
        'last_name',
        'is_staff']


admin.site.register(Speelronde)
admin.site.register(Poule)
admin.site.register(Team)
admin.site.register(Wedstrijd)
admin.site.register(Speellocatie)
admin.site.register(Speler, AdminSpeler)
