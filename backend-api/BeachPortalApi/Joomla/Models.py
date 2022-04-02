from django.db import models
import bcrypt


class JoomlaUser(models.Model):
    name = models.CharField(max_length=400)
    username = models.CharField(unique=True, max_length=150)
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
    block = models.IntegerField()
    sendEmail = models.IntegerField(
        db_column='sendEmail', blank=True, null=True)
    registerdate = models.DateTimeField(db_column='registerDate')
    lastvisitdate = models.DateTimeField(db_column='lastvisitDate')
    activation = models.CharField(max_length=100)
    params = models.TextField()
    lastresettime = models.DateTimeField(db_column='lastResetTime')
    resetcount = models.IntegerField(db_column='resetCount')
    otpkey = models.CharField(db_column='otpKey', max_length=1000)
    otep = models.CharField(max_length=1000)
    requirereset = models.IntegerField(db_column='requireReset')

    def verify_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode('utf8'), self.password.encode('utf8'))

    def save(self, *args, **kwargs):
        raise Exception("Trying to edit joomla user")

    def delete(self, *args, **kwargs):
        raise Exception("Trying to delete joomla user")

    class Meta:
        managed = False
        db_table = 'J3_users'
