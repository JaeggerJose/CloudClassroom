import os
import re
import ldap
import time
import smtplib, ssl
import pygsheets
import subprocess as sp

from createUser import createUser
from notifiLetter import notifiLetter

print('-------------------')
print(time.ctime())

gc = pygsheets.authorize(service_file='/usr/local/create_user/a100-reply-1322e0ee0a72.json')
survey_url = 'https://docs.google.com/spreadsheets/d/1UbSNJl1J3l9ZftNOe4xW6vSlt6hKBx_fybdFeWPdQtE'
sht = gc.open_by_url(survey_url)
df = sht[0].get_as_df()
sht[0].clear(start='A2')

with open('/root/ldappassword', 'r') as w:
    ldappassword = w.read()
ldapconn = ldap.initialize('ldap://10.0.3.1/')
ldapconn.simple_bind_s('cn=admin,dc=dgx,dc=a100,dc=nthu,dc=edu,dc=tw', ldappassword[:-1])

changMail = notifiLetter('張', '')
loMail    = notifiLetter('羅', '')
yangMail  = notifiLetter('楊', '')

for _, row in df.iterrows():
    if row['Username'] == '':
        continue
    # creat user object
    newUser = createUser(username=row['Username'],
                         lab=row['Which laboratory?'],
                         realName = row['Real name'],
                         email = row['E-mail'])

    # add ldap user
    try:
        ldapconn.add_s(newUser.userdn, newUser.addList)
        ldapconn.passwd_s(newUser.userdn, oldpw=None, newpw=newUser.userPassword)
        print('Create user: '+newUser.userIdName)
    except ldap.ALREADY_EXISTS:
        print(newUser.userIdName+' already exists!!!')
        s = smtplib.SMTP(host="10.0.3.1", port=11025)
        s.login("labuser", "testtest")
        s.send_message(newUser.remsg)
        continue

    # add ldap user to lab group
    try:
        ldapconn.modify_s(newUser.labdn, newUser.modList)
        if newUser.lab == 'Chang Lab':
            changMail.addUser(newUser.realName, newUser.userIdName)
        elif newUser.lab == 'Lo Lab':
            loMail.addUser(newUser.realName, newUser.userIdName)
        elif newUser.lab == 'Yang Lab':
            yangMail.addUser(newUser.realName, newUser.userIdName)

    except ldap.TYPE_OR_VALUE_EXISTS:
        print(newUser.userIdName+' already in {}!!!'.format(row['Which laboratory?']))

    # add quota storage limit
    quotaoutput = sp.run(newUser.quotaCommand.split(), capture_output=True)
    if quotaoutput.stderr:
        print('quota Std. Error: ' + quotaoutput.stderr.decode("utf-8")[:-1])

    # add user to slurm
    slurmoutput = sp.run(newUser.slurmCommand.split(), capture_output=True)
    if slurmoutput.stderr:
        print('slurm Std. Error: ' + slurmoutput.stderr.decode("utf-8")[:-1])

    # send email to user
    s = smtplib.SMTP(host="10.0.3.1", port=11025)
    s.login("labuser", "testtest")
    s.send_message(newUser.msg)

    # add user to subuid subgid
    with open('/etc/subuid', 'a') as f:
        f.write('\n{}:296608:65536'.format(newUser.userIdName))
    with open('/etc/subgid', 'a') as f:
        f.write('\n{}:296608:65536'.format(newUser.userIdName))

# Remove slurm user that is not in ldap database
ldapResult = ldapconn.search_s('ou=People,dc=dgx,dc=a100,dc=nthu,dc=edu,dc=tw',
                               ldap.SCOPE_SUBTREE,
                               '(objectClass=posixAccount)',
                               ['cn'])
exitName = [i[1]['cn'][0].decode() for i in ldapResult]

slurmoutput = sp.run('/snap/bin/lxc exec a100 -- sacctmgr show User Format=User%30'.split(), capture_output=True)
rept = re.compile('([lo|yang|chang]+_\S+)')
slurmName = rept.findall(slurmoutput.stdout.decode())

for name in slurmName:
    if name not in exitName:
        print(name + ' is not in ldap Database!!! Ready to delete!!!')
        sp.run(f'/snap/bin/lxc exec a100 -- sacctmgr -i delete User Name={name}'.split(), capture_output=True)

ldapconn.unbind_s()

p = smtplib.SMTP(host="10.0.3.1", port=11025)
p.login("labuser", "testtest")
if changMail.SEND:
    changMail.readyToSend()
    p.send_message(changMail.msg)
if loMail.SEND:
    loMail.readyToSend()
    p.send_message(loMail.msg)
if yangMail.SEND:
    yangMail.readyToSend()
    p.send_message(yangMail.msg)