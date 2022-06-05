import hashlib
import re
from datetime import datetime

from BeachPortalApi.Email.GetPlaceholderValue import IGetPlaceholderValue
from BeachPortalApi.Speler.Speler import Speler
from django.core.mail import send_mail
from django.db import models


class Email(models.Model):
    sender = models.EmailField()
    receiver = models.EmailField()
    title = models.TextField()
    message = models.TextField()
    signature = models.TextField(unique=True)
    dateSent = models.DateTimeField(null=True)

    def isValid(self) -> bool:
        isValid = all([
            self.isValidEmail(self.sender),
            self.isValidEmail(self.receiver),
            self.title,
            self.message,
            re.search(r"{{.*}}", self.title) == None,
            re.search(r"{{.*}}", self.message) == None
        ])
        return isValid

    def getHtml(self):
        body = re.sub(r"(\r\n)|(\n)", "<br>\r\n", self.message)
        return f'''
<!DOCTYPE HTML PUBLIC \"- //W3C//DTD HTML 4.01 Transitional//EN\" \"http: // www.w3.org/TR/html4/loose.dtd\">
<html>
<body>
{body}
</body>
</html>
'''

    @staticmethod
    def isValidEmail(email: str):
        return re.match(r"[^@]+@[^@]+\.[^@]+", email) != None

    @staticmethod
    def fillTemplate(entity: IGetPlaceholderValue, template: str) -> str:
        matches = re.findall(r'{{[A-Z]*}}', template)
        if matches is None:
            return template

        for placeholder in matches:
            value = entity.getPlaceholderValue(placeholder)
            if value == None:
                continue

            template = template.replace(placeholder, value)

        return template

    @staticmethod
    def generate(sender: Speler, receiver: Speler, title: str, message: str, entities):
        for entity in entities:
            title = Email.fillTemplate(entity, title)
            message = Email.fillTemplate(entity, message)

        return Email(
            sender=sender.email,
            receiver=receiver.email,
            title=title,
            message=message
        )

    def calculateSignature(self):
        concatenatedText = f'{self.sender}{self.receiver}{self.title}{self.message}'
        return hashlib.md5(concatenatedText.encode('utf-8')).hexdigest()

    def sendTestMail(self):
        send_mail(
            self.title,
            self.message,
            self.sender,
            [self.receiver],
            html_message=self.getHtml()
        )

    def send(self) -> bool:
        try:
            self.signature = self.calculateSignature()
            self.save()
        except:
            return False

        send_mail(
            self.title,
            self.message,
            self.sender,
            [self.receiver],
            html_message=self.getHtml()
        )
        self.sendDate = datetime.now()
        self.save()

        return True
