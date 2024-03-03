from django.urls import path
from api.views import MyTokenObtainPairView, cluster

urlpatterns = [
    path('clusters/', cluster, name='cluster'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='my_token_obtain_pair'),
    
]
