from BeachPortalApi.Email.GetPlaceholderValue import IGetPlaceholderValue
from BeachPortalApi.Speler.UsernameValidator import UsernameValidator
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class Speler(AbstractUser, IGetPlaceholderValue):
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[UsernameValidator()],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'.strip()

    def getPlaceholderValue(self, placeholder):
        if placeholder == "NAAM":
            return f'{str(self)}'

        return None
