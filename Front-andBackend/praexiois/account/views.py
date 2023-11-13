from django.contrib.auth.models import Group
from django.http import HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
#system import
import os, json, subprocess, random
# import pwd
from subprocess import getoutput
from app.models import AxtasyUser as User

# ldap operation
import ldap3
from ldap3 import Server, Connection, SIMPLE, MODIFY_ADD, ALL
from praexiois.settings import LDAP_SERVER, LDAP_ADMIN, LDAP_PASSWORD, LDAP_BASE

from rest_framework.decorators import api_view
from rest_framework.response import Response
import hashlib

salt = "axtasy_web_version"


def hash_password(password):
    dataBase_password = password+salt
    hash = hashlib.pbkdf2_hmac('sha256', dataBase_password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return hash.hex()



def LDAP_connect():
    server = ldap3.Server(LDAP_SERVER)
    conn = ldap3.Connection(server, auto_bind=True, user=LDAP_ADMIN, password=LDAP_PASSWORD)
    return conn

def get_user_guid():
    while True:
        uid = random.randint(10000, 65535)  # Generate a random UID within the range of user IDs
        '''
        try:
            pwd.getpwuid(uid)  # Attempt to get the user entry for the generated UID
        except KeyError:
            return uid
        '''
        return 10000

@api_view(['GET'])
def lab_list(request):
    conn = LDAP_connect()
    conn.search('dc=axtasy,dc=cgu,dc=edu,dc=tw', '(objectclass=top)', attributes=['cn'])
    group_list = []
    for entry in conn.entries:
        group_list.append(entry.cn.value)
    conn.unbind()
    return Response(group_list, status=200)



@csrf_exempt
def admin_create_labmanager(request):
    data = json.loads(request.body.decode('utf-8'))
    gid_uid = get_user_guid()
    print(gid_uid)
    name = data['usernamelabadmin']
    pw = data['password']

    # add into ldap
    conn = LDAP_connect()
    conn.add('cn={0},ou=group,{1}'.format(name, LDAP_BASE), ['posixGroup', 'top'], {'cn': ['{}'.format(name)], 'gidNumber': ['{}'.format(gid_uid)]})
    print(conn.add('uid={},ou=user,{}'.format(name, LDAP_BASE), ['inetOrgPerson', 'posixAccount', 'shadowAccount', 'top'], {'cn': name, 'givenName': name, 'sn': name, 'uid': name, 'uidNumber': gid_uid, 'gidNumber': gid_uid, 'homeDirectory': '/home/{}'.format(name), 'loginShell': '/bin/bash', 'shadowFlag': '0', 'shadowMin': '0', 'shadowMax': '99999', 'shadowWarning': '0', 'shadowInactive': '99999', 'shadowLastChange': '12011', 'shadowExpire': '99999', 'userPassword': pw}))
    group_dn = 'cn={},ou=group,{}'.format(name, LDAP_BASE)
    conn.modify(group_dn, {'memberUid': [(MODIFY_ADD, [data['usernamelabadmin']])]})

        # add Django user
    user = User.objects.create_user(name,data['email'], pw)
    user.permission_level = 2
    user.is_staff = True
    user.save()
    group = Group.objects.create(name=name)
    user = User.objects.get(username=name)
    user.groups.add(group) 
        ## add Slurm user
    os.system('sacctmgr create account name={} -i'.format(name))
    os.system('sacctmgr create user name={0} account={1} -i'.format(name, name))
    status_code= {'status_code':400}
    return JsonResponse({'status':200}, safe=False)


@csrf_exempt
def labadmin_create_user(request):
    data = json.loads(request.body.decode('utf-8'))
    gid_uid = get_user_guid()
    pw = data['password']
    user = User.objects.create_user(data['username'],data['email'], pw)
    user.permission_level = 3
    user.save()

    conn = LDAP_connect()
    conn.add('uid={0},ou=user,{1}'.format(data['username'], LDAP_BASE), ['inetOrgPerson', 'posixAccount', 'shadowAccount', 'top'], {'cn': data['username'], 'givenName': data['username'], 'sn': data['username'], 'uid': data['username'], 'uidNumber': gid_uid, 'gidNumber': gid_uid, 'homeDirectory': '/home/{}'.format(data['username']), 'loginShell': '/bin/bash', 'shadowFlag': '0', 'shadowMin': '0', 'shadowMax': '99999', 'shadowWarning': '0', 'shadowInactive': '99999', 'shadowLastChange': '12011', 'shadowExpire': '99999', 'userPassword': pw})
    conn.search('ou=group,{}'.format(LDAP_BASE), '(cn={})'.format(request.user.username), attributes=['memberUid'])
   # group_dn = conn.entries[0].entry_dn
    
   # conn.modify(group_dn, {'memberUid': [(MODIFY_ADD, [data['username']])]})

   # group = Group.objects.get(name=request.user.username)
    user = User.objects.get(username=data['username'])
    #user.groups.add(group)
   # os.system('sacctmgr create user name={0} account={1} -i'.format(data['username'], group))
    
    return JsonResponse({'status':200}, safe=False)

def labadmin_list(request):
    details = User.objects.filter(permission_level=2)
    datas = list(details.values('username'))
    labadminlist = []
    for data in datas:
        labadminlist.append({'name':data['username']})
    return JsonResponse(labadminlist, safe=False)

def user_list(request):
    details = User.objects.filter(permission_level=3)
    datas=list(details.values('username'))
    userlist = []
    for data in datas:
        userlist.append({'name':data['username']})
    return JsonResponse(userlist, safe=False)

@csrf_exempt
def user_delete(request):
    data = json.loads(request.body.decode('utf-8'))
    username = data['name']
    request_username = User.objects.get(username=request.user.username)
    permision_level = request_username.permission_level
    conn = LDAP_connect()
    conn.delete('uid={},ou=user,dc=slurmcgu,dc=com,dc=tw'.format(username))
    conn.delete('cn={},ou=group,dc=slurmcgu,dc=com,dc=tw'.format(username))

    #django db delete
    dbuser = User.objects.get(username=username)
    dbuser.delete()
    dbgroup = Group.objects.get(name=username)
    dbgroup.delete()

    os.system("sacctmgr delete user name=={0} account={1} -i".format(username,username))
    os.system("sacctmgr delete account name={} -i".format(username))
    return JsonResponse({'status':200}, safe=False)

@csrf_exempt
def user_deletefromlabadmin(request):
    data = json.loads(request.body.decode('utf-8'))
    username = data['name']
    groupname = request.user.username
    conn = LDAP_connect()
    conn.delete('uid={},ou=user,{}'.format(username, LDAP_BASE))
    #django db delete
    dbuser = User.objects.get(username=username)
    dbuser.delete()
    os.system("sacctmgr delete user name=={0} account={1} -i".format(username,groupname))
    return JsonResponse({'status':200}, safe=False)

#this part is for password chnage
@csrf_exempt
def passwordchange(request):
    data = json.loads(request.body.decode('utf-8'))
    User.objects.filter(is_superuser=True)
    username = data['usernamelabadmin']
    userpass =  hash_password(data['password'])
    #ldif change
    conn = LDAP_connect()
    #ldap3 change password
    conn.modify('uid={},ou=user,{}'.format(username, LDAP_BASE), {'userPassword': [(ldap3.MODIFY_REPLACE, [userpass])]})
    #djangjo db change
    usr = User.objects.get(username=username)
    usr.set_password(userpass)
    usr.save()
    status_code= {'status':200}
    return JsonResponse(status_code)

@csrf_exempt
def userpasswordchange(request):
    data = json.loads(request.body.decode('utf-8'))
    User.objects.filter(is_superuser=True)
    username = data['usernamelabuser']
    userpass = hash_password(data['password'])
    #ldif change
    conn = LDAP_connect()
    conn.modify('uid={},ou=user,{}'.format(username, LDAP_BASE), {'userPassword': [(ldap3.MODIFY_REPLACE, [userpass])]})
    #djangjo db change
    usr = User.objects.get(username=username)
    usr.set_password(userpass)
    usr.save()
    status_code= {'status':200}
    return JsonResponse(status_code)
