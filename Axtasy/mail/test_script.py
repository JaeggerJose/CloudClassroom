import sys
import re
import logging
import smtplib
import pathlib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

with open("/tmp/slurm_test.txt", 'w') as f:
    f.write('testtesttesttest')

s = smtplib.SMTP(host="10.0.3.1", port=11025)
s.login("labuser", "testtest")
msg = MIMEMultipart("alternative")
msg['subject'] = "This is a test subject"
msg['To'] = "st_wong@praexisio.com.tw"
# msg['To'] = "stw09701125@gmail.com"
msg['From'] = "slurm@praexisio.com.tw"
content = sys.argv[2]
user_email = sys.argv[3]
job_id = re.search(r"Job_id=(?P<job_id>[0-9]+)", content).group("job_id")
action = re.search(r"(?P<action>[\w]+)", content).group("action")
# job_id = re.search(r"Job_id=(?P<job_id>[0-9]+)", sys.argv[4]).group("job_id")
# action = re.search(r"(?P<action>[\w]+)", sys.argv[6]).group("action")
# filename = f"{job_id}.{action}.mail"
# spool_dir = "/var/spool/slurm-mail"
# path = pathlib.Path(spool_dir).joinpath(filename)
# with path.open(mode="w") as f:
#     f.write(sys.argv[-1])
# text = f"{sys.argv[4]},{sys.argv[6]},{sys.argv[-1]}"
# text = f"{job_id}.{action}.{user_email}"
text = f"0:{sys.argv[0]}\n1:{sys.argv[1]}\n2:{sys.argv[2]}\n3:{sys.argv[3]}"
#for i in sys.argv:
#    text += f"{i}\n"
msg.attach(MIMEText(text, 'plain'))
s.sendmail("slurm@praexisio.com.tw", "st_wong@praexisio.com.tw", msg.as_string())
s.send_message(msg)


