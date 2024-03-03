from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User, Group

from .models import Cluster, Job
from .serializers import ClusterSerializer

from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response


from django.views.decorators.csrf import csrf_exempt
# Create your views here.
    
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET', 'POST'])
def cluster(request):
    if request.method == 'GET':
        # get all clusters
        clusters = Cluster.objects.all()
        serializer = ClusterSerializer(clusters, many=True)
        return Response(serializer.data, status=200)
    elif request.method == 'POST':
        # get a cluster's info
        name = request.data.get('name')
        # check if the cluster exists
        try:
            cluster = Cluster.objects.get(name=name)
        except Cluster.DoesNotExist:
            return Response(status=404, data={'error': 'Cluster not found'})
        
        # modify the cluster's cpu
        cpu = request.data.get('cpu')
        if cpu:
            cluster.cpu = cpu
            cluster.save()
            return Response(status=200, data={'message': 'Cluster {} modified cpu to {}'.format(name, cpu)})
        
        # modify the cluster's memory
        memory = request.data.get('memory')
        if memory:
            cluster.memory = memory
            cluster.save()
            return Response(status=200, data={'message': 'Cluster {} modified memory to {}'.format(name, memory)})
        
        # modify the cluster's gpu
        gpu = request.data.get('gpu')
        if gpu:
            cluster.gpu = gpu
            cluster.save()
            return Response(status=200, data={'message': 'Cluster {} modified gpu to {}'.format(name, gpu)})
    else:
        return Response(status=400, data={'error': 'Bad request'})