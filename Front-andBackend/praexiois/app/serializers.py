from .models import AxtasyUser, Job
from django.contrib.auth.models import Group
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        Auser = AxtasyUser.objects.get(username=user.username)
        token['level'] = Auser.permission_level
        token['email'] = Auser.email
        token['username'] = Auser.username
        token['labname'] = Auser.groups.all()[0].name
        token['auth'] = True
        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
        

class UserSerializer(serializers.ModelSerializer):
     class Meta:
         model = AxtasyUser
         fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
     class Meta:
         model = Job
         fields = '__all__'
