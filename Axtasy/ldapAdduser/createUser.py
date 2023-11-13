import ldap
import numpy as np
import subprocess as sp
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class createUser:
    def __init__(self, **kwargs):

        self.labInfo = {'Chang Lab':{'gid':'31002', 'prefix':'chang', 'labName':'changlab'},
                        'Lo Lab'   :{'gid':'32976', 'prefix':'lo'   , 'labName':'lolab'},
                        'Yang Lab' :{'gid':'36101', 'prefix':'yang' , 'labName':'yanglab'}
                       }
        self.addList = [('objectclass', [b'posixAccount', b'top', b'inetOrgPerson', b'shadowAccount', b'ldapPublicKey'])]
        self.username = kwargs['username']
        self.lab = kwargs['lab']
        self.realName = kwargs['realName']
        self.email = kwargs['email']
        self.uidNumber = self._getUidNumber()
        self._buildAddList()
        self._buildRepeatUsernameEmail()
        self._getNewPassword()
        self._buildModList()
        self.quotaCommand = 'setquota -u {uidnumber} 20000000 20100000 0 0 /'.format(uidnumber=self.uidNumber)
        self.slurmCommand = '/snap/bin/lxc exec a100 -- sacctmgr -i add user name={username} account={lab}'.format(username=self.userIdName, lab=self.labInfo[self.lab]['labName'])
        self._buildUserEmail()

    def _getUidNumber(self):
        ldapconn= ldap.initialize('ldap://10.0.3.1/')
        res = ldapconn.search_s('dc=dgx,dc=a100,dc=nthu,dc=edu,dc=tw', ldap.SCOPE_SUBTREE, 'objectclass=posixaccount', ['uidNumber'])
        allUid = np.array([int(r[1]['uidNumber'][0].decode()) for r in res])
        return str(allUid.max() + 1)

    def _addShadow(self):
        self.addList.append(('loginShell', b'/bin/bash'))
        self.addList.append(('shadowFlag', b'0'))
        self.addList.append(('shadowMin', b'0'))
        self.addList.append(('shadowMax', b'99999'))
        self.addList.append(('shadowWarning', b'0'))
        self.addList.append(('shadowInactive', b'99999'))
        self.addList.append(('shadowExpire', b'99999'))

    def _buildAddList(self):
        self.userIdName = self.labInfo[self.lab]['prefix']+'_'+self.username
        self.labgidNumber = self.labInfo[self.lab]['gid']
        self.userdn = 'uid={},ou=People,dc=dgx,dc=a100,dc=nthu,dc=edu,dc=tw'.format(self.userIdName)

        self.addList.append(('sn', self.realName.encode()))
        self.addList.append(('givenName', self.labInfo[self.lab]['prefix'].encode()))
        self.addList.append(('cn', self.userIdName.encode()))
        self.addList.append(('uid', self.userIdName.encode()))
        self.addList.append(('uidNumber', self.uidNumber.encode()))
        self.addList.append(('gidNumber', self.labgidNumber.encode()))
        self.addList.append(('homeDirectory', '/home/{}'.format(self.userIdName).encode()))
        self.addList.append(('mail', self.email.encode()))
        self._addShadow()

    def _getNewPassword(self):
        output = sp.run('pwgen -Bcn 16 1'.split(), capture_output=True)
        self.userPassword = output.stdout.decode("utf-8")[:-1]

    def _buildModList(self):
        self.labdn = 'cn={},ou=Group,dc=dgx,dc=a100,dc=nthu,dc=edu,dc=tw'.format(self.labInfo[self.lab]['labName'])
        self.modList = [(ldap.MOD_ADD, 'memberUid', self.userIdName.encode())]

    def _buildUserEmail(self):
        self.msg = MIMEMultipart("alternative")
        self.msg['subject'] = "Hi {realName}, welcome to DGX A100".format(realName=self.realName)
        self.msg['To'] = self.email
        self.msg['From'] = "axtasy@labylw17.life.nthu.edu.tw"
        text = '''
        Hello {realName},

        Thank you for registering DGX A100.
        Your username is: {userIdName}
        Your password is: {userPassword}

        Please login a100 using the following command
        "ssh {userIdName}@140.114.97.192"

        Please change your password with "passwd" command immediately after logging in successfully.

        1. Must have at least one lowercase character.
        2. Must have at least one uppercase character.
        3. Must have at least one digital character.
        4. The password length cannot be less than 8.

        Enjoy using DGX A100!

        This mail is sent by the automatic system. Please do not reply it.
        Thanks.
        '''.format

        self.msg.attach(MIMEText(text(realName=self.realName,
                                      userIdName=self.userIdName,
                                      userPassword=self.userPassword),
                                'plain'))
    
    def _buildRepeatUsernameEmail(self):
        self.remsg = MIMEMultipart("alternative")
        self.remsg['subject'] = "User exists".format(realName=self.realName)
        self.remsg['To'] = self.email
        self.remsg['From'] = "axtasy@labylw17.life.nthu.edu.tw"
        text = '''
        Hello {realName},

        Thank you for registering DGX A100.
        Unfortunately your username {userIdName} already exists.
        Please register another new username.
        
        This mail is sent by the automatic system. Please do not reply it.
        Thanks.
        '''.format

        self.remsg.attach(MIMEText(text(realName=self.realName, userIdName=self.userIdName), 'plain'))