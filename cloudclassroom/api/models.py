from django.db import models
from django.contrib.auth.models import User, Group
from django.contrib import admin

# Create your models here.
class Job(models.Model):
    # Description 
    cluster = models.ForeignKey('Cluster', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    
    # Resource
    gpu = models.IntegerField(default=0)
    memory = models.IntegerField(default=0)
    cpu = models.IntegerField(default=0)
    
    # Status
    status = models.CharField(max_length=100, default='pending')
    
    class Meta:
        unique_together = ('cluster', 'name', 'user')
    
    def __str__(self):
        return self.name+'@'+self.cluster.name+' by '+self.user.username

class Cluster(models.Model):
    ip = models.GenericIPAddressField()
    # primary key
    name = models.CharField(max_length=100, primary_key=True)
    # Resource
    gpu = models.IntegerField(default=0)
    memory = models.IntegerField(default=0)
    cpu = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
# admin site    
admin.site.register(Job)
admin.site.register(Cluster)