# Slurm E-mail Notification
> Used [Slurm-Mail](https://github.com/neilmunday/slurm-mail/tree/2.3)

## Usage

1. Copy this dir to `/opt`
```bash
cp -r mail/ /opt/slurm-mail
```
2. Change slurm.conf `MailProg`
```bash
vim /etc/slurm-llnl/slurm.conf

...
#JobRequeue=1
#JobSubmitPlugins=1
#KillOnBadExit=0
#LaunchType=launch/slurm
#Licenses=foo*4,bar
MailProg=/opt/slurm-mail/mail_script.sh
#MaxJobCount=5000
#MaxStepCount=40000
#MaxTasksPerNode=128
...
```
3. Restart `slurmctld`
```bash
systemctl restart slurmctld
```

## Mail Server Setting
We use postfix image to start a mail server with docker

1. git clone `labmailserver-image` repo
```bash
git clone http://save.praexisio.com.tw/gitlab/YuanYu/labmailserver-image.git
```
2. docker-compose up the container with the image
```bash
cd labmailserver-image/
docker-compose up
```

3. check ip and port
4. slurm-mail.conf setting
```conf
[slurm-send-mail]
# slurm-send-mail.py settings
logFile = /var/log/slurm-mail/slurm-send-mail.log
emailFromUserAddress = slurm.admin@praexisio.com.tw
emailFromName = slurmAdmin
emailSubject = Job $CLUSTER.$JOB_ID: $STATE
datetimeFormat = %d/%m/%Y %H:%M:%S
sacctExe = /usr/bin/sacct
scontrolExe = /usr/bin/scontrol
# A100 postfix docker container ip
smtpServer = 10.0.3.1
# A100 postfix docker container exposed port 11025:25
smtpPort = 11025
smtpUseTls = no
# A100 postfix docker container default user
smtpUserName = labuser
smtpPassword = testtest
```
5. Avoid being blocked  
**Change domain name to labylw17.life.nthu.edu.tw**
```
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

s = smtplib.SMTP(host="10.0.3.1", port=11025)
s.login("labuser", "testtest")

msg = MIMEMultipart("alternative")
msg['subject'] = "Hi, welcome to DGX A100"
msg['To'] = 'st_wong@praexisio.com.tw '
msg['From'] = "axtasy@labylw17.life.nthu.edu.tw"

msg.attach(MIMEText('Just a test!!', 'plain'))

s.send_message(msg)

```