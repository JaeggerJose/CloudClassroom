from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class notifiLetter:
    def __init__(self, lab, email):
        self.SEND = False
        self.msg = MIMEMultipart("alternative")
        self.msg['subject'] = "New user in DGX A100"
        self.msg['To'] = email
        self.msg['From'] = "noreply@a100.com.tw"
        self.text = '''
        {lab}老師您好,

        '''.format(lab=lab)

    def addUser(self, realName, userIdName):
        self.SEND = True
        self.text+='''{realName:<2}已經成功申請{userIdName:^25}作為他的帳號並加入您實驗室在 DGX A100 中的群組
        '''.format(realName=realName, userIdName=userIdName)

    def readyToSend(self):
        self.text += '''
        此信件為系統自動傳送，請勿直接回覆
        如有任何問題，請與 prx_service@praexisio.com.tw 聯絡，謝謝
        '''
        self.msg.attach(MIMEText(self.text, 'plain'))