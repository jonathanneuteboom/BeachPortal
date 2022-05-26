# Generated by Django 4.0.3 on 2022-05-26 13:28

import BeachPortalApi.Speler.UsernameValidator
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BeachPortalApi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speler',
            name='username',
            field=models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[BeachPortalApi.Speler.UsernameValidator.UsernameValidator()], verbose_name='username'),
        ),
    ]
