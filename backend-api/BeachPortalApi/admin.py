from BeachPortalApi.Poule.models import Poule
from BeachPortalApi.Speellocatie.models import Speellocatie
from BeachPortalApi.Speelronde.models import Speelronde
from BeachPortalApi.Speler.Speler import Speler

from BeachPortalApi.Team.models import Team
from BeachPortalApi.Wedstrijd.models import Wedstrijd
from django.contrib import admin


from django.contrib.auth.forms import UserChangeForm
from django.utils.translation import gettext_lazy as _


class DomainUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Speler
        help_texts = {
            'username': _('Required. 150 characters orddd fewer. Letters, digits and \/@/./+/-/_ only.'),  # NOQA
        }


class AdminSpeler(admin.ModelAdmin):
    form = DomainUserChangeForm
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
