from django.urls import path
from .views import *


urlpatterns = [
    path('clusters/', cluster, name='cluster'),
]
