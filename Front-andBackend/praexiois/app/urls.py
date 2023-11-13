from django import views
from django.urls import path, include, re_path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.IndexView, name='index'),
    #re_path(r'.*', views.IndexView),
    #path('create/', views.create, name='create'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("currentuser/", views.current_user, name="current_user"),
    path('create/active/', views.create_active, name='create_active'),
    path("status/", views.status_page, name="status"),
    path("sleepdata/", views.sleepjob_page, name="sleepjob"),
    path("scheduletaskdata/", views.schedule_page, name="schedule"),
    path("taskreboot/",views.task_reboot,name="task_reboot"),
    path("taskdelete/",views.task_delete,name="task_delete"),
    path("taskcommit/",views.task_commit,name="task_commit"),
    path("tasksleepdelete/",views.task_sleep_delete,name="task_sleep_delete"),
    path("tasksleeprebuild/",views.task_sleep_rebuild,name="task_sleep_rebuild"),
    path("taskscheduledelete/",views.task_schedule_delete,name="task_schedule_delete"),
    path("taskscheduleupdate/",views.task_schedule_update,name="task_schedule_update"),
    path("accounts/", include("django.contrib.auth.urls")),
    path("loginuser/", views.signin, name="signin"),
    path("logout/", views.logout, name="logout"),
    path('labsystem/', views.IndexView, name='index'),
    path('system/', views.IndexView, name='index'),
    path('userguide/', views.IndexView, name='index'),
    path('manageadmin/', views.lab_lsit, name='index'),
    path('userlist/', views.user_list, name="userlist"),
    path('managelabadmin/', views.IndexView, name='index'),
    
]
