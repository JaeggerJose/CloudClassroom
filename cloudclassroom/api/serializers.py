from rest_framework import serializers
from .models import Cluster, Job

class ClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cluster
        fields = '__all__'