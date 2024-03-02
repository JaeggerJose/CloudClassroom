# Generated by Django 5.0.2 on 2024-03-02 14:25

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='job',
            unique_together={('cluster', 'name', 'user')},
        ),
    ]