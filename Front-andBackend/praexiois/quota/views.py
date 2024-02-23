from django.shortcuts import render
from .models import Quota, JobQuota
from app.models import AxtasyUser, Job
# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

def create_quota(user, folder):
    try:
        # create a new quota
        quota = Quota(user=user, folder=folder)
        quota.save()
        return Response({'message': 'Quota created successfully'}, status=201)
    except Exception as e:
        return Response({'message': 'Error creating quota'}, status=500)

def delete_quota(user, folder):
    try:
        # delete a quota
        quota = Quota.objects.get(user=user, folder=folder)
        quota.delete()
        return Response({'message': 'Quota deleted successfully'}, status=200)
    except Exception as e:
        return Response({'message': 'Error deleting quota'}, status=500)

def create_job_quota(job, quota, status):
    try:
        # create a new job quota
        job_quota = JobQuota(job=job, quota=quota, status=status)
        job_quota.save()
        return Response({'message': 'Job quota created successfully'}, status=201)
    except Exception as e:
        return Response({'message': 'Error creating job quota'}, status=500)
    
def delete_job_quota(job, quota):
    try:
        # delete a job quota
        job_quota = JobQuota.objects.get(job=job, quota=quota)
        job_quota.delete()
        return Response({'message': 'Job quota deleted successfully'}, status=200)
    except Exception as e:
        return Response({'message': 'Error deleting job quota'}, status=500)

