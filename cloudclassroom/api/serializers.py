from rest_framework import serializers
from .models import Cluster, Job

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from account.models import Detail

def levelClassify(level):
    if level == 1:
        return 'student'
    elif level == 2:
        return 'teacher'
    elif level == 3:
        return 'admin'
    else:
        return 'unknown'

class ClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cluster
        fields = '__all__'
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def __init__(self, *args, **kwargs):
        super(MyTokenObtainPairSerializer, self).__init__(*args, **kwargs)
        self.fields['group_name'] = serializers.CharField(required=False)
        self.fields['group_permissions'] = serializers.IntegerField(required=False)
        group_name = self.fields['group_name']
        group_permissions = self.fields['group_permissions']

    def get_token(self, user):
        token = super().get_token(user)
        # print group_name
        
        # add group_name to token
        return token
    
    def validate(self, attrs):
        group_name = attrs.get('group_name', None)
        group_permissions = attrs.get('group_permissions', None)
        
        data = super().validate(attrs)
        if group_name:
            user_groups = [group.name for group in self.user.groups.all()]
            if group_name not in user_groups:
                raise serializers.ValidationError("User does not belong to the specified group.")
        elif self.user.groups.count() == 0:
            raise serializers.ValidationError("User does not belong to any group.")
        # request.data.get('group') in LoginView not match with the group_name in database
        elif self.user.groups.filter(name=group_name).count() == 0:
            raise serializers.ValidationError("User does not belong to the specified group.")
        
        
        
        # check permissions from Detail model

        if group_permissions:
            user_detail = Detail.objects.get(user=self.user)
            
            if group_permissions != user_detail.level:
                raise serializers.ValidationError("User does not have the specified permissions.")
            else:
                data['level'] = levelClassify(group_permissions)
        data['group'] = group_name
        
        return data
    
    def __init__(self, *args, **kwargs):
        super(MyTokenObtainPairSerializer, self).__init__(*args, **kwargs)
        self.fields['group_name'] = serializers.CharField(required=False)
        self.fields['group_permissions'] = serializers.IntegerField(required=False)
        
   