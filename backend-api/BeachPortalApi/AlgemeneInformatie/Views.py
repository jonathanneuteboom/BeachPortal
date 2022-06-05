from BeachPortalApi.AlgemeneInformatie.Document import Document
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class AlgemeneInformatieViewSet(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        content = request.data['content']
        try:
            document = Document.objects.get(id=1)
            document.content = content
            document.save()
        except Document.DoesNotExist:
            document = Document.objects.create(content=content)
            document.save()
        return Response()

    def get(self, request):
        try:
            document = Document.objects.get(id=1)
            return Response(data=document.content)
        except Document.DoesNotExist:
            return Response()
