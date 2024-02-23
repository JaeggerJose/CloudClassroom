from django.db import models
from app.models import AxtasyUser, Job

class Quota(models.Model):
    user = models.ForeignKey(AxtasyUser, on_delete=models.CASCADE, null=True)
    folder = models.CharField(max_length=50)

class JobQuota(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True)
    quota = models.ForeignKey(Quota, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=20)
    # Create your models here.


# Create your models here.
