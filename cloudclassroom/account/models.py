from django.db import models
from django.contrib.auth.models import User, Group
from django.contrib import admin

# Create your models here.
class Detail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    level = models.IntegerField(range(1, 3), default=1) # 1: student, 2: teacher, 3: admin
    
    def __str__(self):
        return self.user.username+'@'+self.group.name
    # Unique together
    class Meta:
        unique_together = ('user', 'group')
        
# admin site
admin.site.register(Detail)