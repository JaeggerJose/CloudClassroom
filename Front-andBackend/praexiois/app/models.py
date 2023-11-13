from django.db import models
from django import forms
from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group, Permission

class AxtasyUser(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set'  # Custom related name for the groups reverse relation
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set'  # Custom related name for the user_permissions reverse relation
    )
    permission_level = models.IntegerField(range(1,3), null=True)
    def __str__(self):
        return self.username
# Create your models here.
class Job(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    #reference to the object User and when it was deleted this Job under the User will be deleted too
    
    # Basic infroamtion
    jobname = models.CharField(max_length=50)
    imagetype = models.CharField(max_length=50, null=True)
    remark = models.CharField(max_length=50, default='')
    
    # Task time
    createdate = models.CharField(max_length=20)
    
    # Conncetion port
    webtopurl = models.IntegerField(null=True)
    
    #job details
    jobid = models.CharField(unique=True, null=True, max_length=50)
    mem_num = models.IntegerField(null=True)
    cpu_core = models.IntegerField(null=True)
    gpu_num =  models.IntegerField(null=True)
    
    #status of job
    status = models.CharField(max_length=20)
    
    #make the information rendering on the admin website and because jobid is integer we need to change it to string
    def __str__(self):
        return str(self.jobid)
class SleepJob(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    #reference to the object User and when it was deleted this Job under the User will be deleted too
    
    # Basic infroamtion
    jobname = models.CharField(max_length=50)
    imagetype = models.CharField(max_length=50, null=True)
    remark = models.CharField(max_length=50, default='')
    
    # Task time
    sleepdate = models.CharField(max_length=20)
    
     
    #job details
    jobid = models.CharField(unique=True, null=True, max_length=50)
    mem_num = models.IntegerField(null=True)
    cpu_core = models.IntegerField(null=True)
    gpu_num =  models.IntegerField(null=True)
    
    
    #make the information rendering on the admin website and because jobid is integer we need to change it to string
    def __str__(self):
        return str(self.jobid)
class Schedule(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True)
    #reference to the object User and when it was deleted this Job under the User will be deleted too
    
    # Task time
    expectopentime = models.CharField(max_length=20)
    expectclosetime = models.CharField(max_length=20)
    
    # slurmjobs
    #slurmjobs = models.CharField(max_length=50,default='')
    slurmjobs = models.TextField()
    #schedule details
    scheduleid = models.CharField(unique=True, null=True, max_length=50)
    
    #make the information rendering on the admin website and because jobid is integer we need to change it to string
    def __str__(self):
        return str(self.scheduleid)
"""
class  Detail(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length= 20, unique = True)
    permission_level = models.IntegerField(range(1,3))
    def __str__(self):
        return str(self.name)
"""
