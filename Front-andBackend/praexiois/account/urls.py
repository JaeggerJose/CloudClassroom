from django import views
from django.urls import path
from . import views

app_name = 'account'
urlpatterns = [
    path('createlabadmin/', views.admin_create_labmanager, name='createlabadmin'),
    path('createuser/', views.labadmin_create_user, name='createuser'),
    path('labadminlist/', views.labadmin_list, name='labadmin_list'),
    path('userlist/', views.user_list, name='user_list'),
    path('labadmindelete/', views.user_delete, name='userdelete'),
    path('userdelete/', views.user_deletefromlabadmin, name='user_delete_labadmin'),
    path('labadminpasswordchange/', views.passwordchange, name='labadminpasswordchange'),
    path('userpasswordchange/', views.userpasswordchange, name='userpasswordchange'),
    path('lab_list/',  views.lab_list, name='lab_list'),
]
