from django.http import HttpResponseRedirect , JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
#system import
import time, os, random, json, re
#from subprocess import getoutput
import subprocess
from datetime import datetime, timedelta

# Darunter ist für Djangorestframework import library
from app.models import Job ,SleepJob,Schedule, AxtasyUser as User
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate, login
from django.contrib import auth

from .runtask import run_reboot,run_delete,run_commit,run_sleep_delete,run_schedule_delete
from rest_framework.decorators import api_view
from rest_framework.response import Response

@csrf_exempt
def signin(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['email']
    password = data['password']
    user_fix = User.objects.get(email=data['email'])
    auth = user_fix.username
    user = authenticate(username=auth, password=password)
    login(request, user)
    level = User.objects.get(username=auth).permission_level
    userdata = {
            'email':email,
            'username':auth,
            'level':level,
         }
    return JsonResponse(userdata)

def information_write_database(data, name, user_name, port):
    user_datas = User.objects.get(username = user_name)
    data_job = user_datas.job_set.create(jobname=name, imagetype=data['imagename'], createdate=datetime.now(),
                                         webtopurl=port, jobid=int(name), mem_num=data['memory'], 
                                         cpu_core=data['cpu'], gpu_num=data['gpu'], status='processing',)
    data_job.save()
    return 0

def get_image_type(imagename):
    if imagename == 'webtop_matlab':
        image_types = 'lms025187/webtop_matlab'
    elif imagename == 'webtop_orange3_CLC':
        image_types = 'lms025187/webtop_bio_software'
    elif imagename == 'webtop_itksnap':
        image_types = 'lms025187/webtop_itk'
    elif imagename == 'webtop_3dslicer':
        image_types = 'lms025187/webtop_image_captioning'
    elif imagename == 'jupyter_notebook':
        image_types = 'lms025187/webtop_jupyter'
    else:
        image_types = imagename
    return image_types

def file_write_function(data, name, user_group, port, user_name):
    
    action=data['action']
    scheduletype =""
    opentimeformat = "now"
    closetimeformat = "now"
    slurmjobs=""
    #device Variable
    if action=='newjob':
        mem_number = data['memory']
        cpus_per_task = data['cpu']
        ntasks_num = data['gpu']
        image_name = data['imagename']
        image_types = get_image_type(image_name)
  
        remark=data['remark']
        #schedule Variable
        schedule=data['schedule']
        scheduletype=schedule['type']
        if scheduletype =='specifictime':
            opentime=schedule['info']['expectopentime']
            closetime=schedule['info']['expectclosetime']
            opsplit = opentime.split("-")
            cssplit = closetime.split("-")
            #整理成slurm要求的格式為西元年-月-日T時:分:秒(2022-12-02T12:30:00) 如果年/月/日/時/分/秒只有個位數 十位數缺少0需要補上slurm才認得
            opentimeformat = "{:0>4}-{:0>2}-{:0>2}T{:0>2}:{:0>2}:{:0>2}".format(opsplit[0],opsplit[1],opsplit[2],opsplit[3],opsplit[4],"00")
            closetimeformat = "{:0>4}-{:0>2}-{:0>2}T{:0>2}:{:0>2}:{:0>2}".format(cssplit[0],cssplit[1],cssplit[2],cssplit[3],cssplit[4],"00")
        """
        # elif scheduletype == 'looptime':
        #     frequency=schedule['info']['frequency']
        #     if frequency == "day":
        #         datelist=schedule['info']['daterange']
        #         opendate=datelist[0]
        #         closedate=datelist[1]
        #         #open/close time與"specifictime"時不一樣 這次不存日期+時間 只存時間
        #         opentime=schedule['info']['expectopentime']
        #         closetime=schedule['info']['expectclosetime']
        #     elif frequency == "week":
        #         datelist=schedule['info']['daterange']
        #         opendate=datelist[0]
        #         closedate=datelist[1]
        #         #open/close time與"specifictime"時不一樣 這次不存日期+時間 只存時間
        #         opentime=schedule['info']['expectopentime']
        #         closetime=schedule['info']['expectclosetime']
        #         #選星期幾(多選)
        #         weeklist=schedule['info']['week']
        #     elif frequency == "month":
        #         datelist=schedule['info']['daterange']
        #         opendate=datelist[0]
        #         closedate=datelist[1]
        #         #open/close time與"specifictime"時不一樣 這次不存日期+時間 只存時間
        #         opentime=schedule['info']['expectopentime']
        #         closetime=schedule['info']['expectclosetime']
        #         #選日期(多選)
        #         monthlist=schedule['info']['month']
        """
    elif action=='rebuild':
        job_name=data['jobname']
        jobdata=list(SleepJob.objects.filter(jobname=job_name).values("mem_num","cpu_core","gpu_num","imagetype","remark"))[0] 
        mem_number = jobdata['mem_num']
        cpus_per_task = jobdata['cpu_core']
        ntasks_num = jobdata['gpu_num']
        
        remark=jobdata['remark']
        #image_name=jobdata['imagetype']     
        image_name=job_name     
        image_types=job_name+":latest"

    
    
    # #path Variable
    format_datetime = "%Y%m%d%H%M%S"

    #port = getoutput('sudo srun --pty getAvailablePort')
    fopen_file = '/home/ccllab/Desktop/Job_queue/job{}.sh'.format(name)
    change_fileowner = 'chown {0} /home/ccllab/Desktop/Job_queue/job{1}.sh'.format(user_name ,name)
    change_filegroup = 'chown :{0} /home/ccllab/Desktop/Job_queue/job{1}.sh'.format(user_group ,name)
    change_priority = 'chmod 770 -R /home/ccllab/Desktop/Job_queue/job{}.sh'.format(name)
    docker_name = '{0}_{1}_{2}'.format(user_name, image_name, name)
    
    #file produce
    f = open(fopen_file,'w+')
    f.write("#!/bin/bash\n")
    f.write("#SBATCH --job-name=job{}\n".format(name))
    os.mkdir('/export/home/{}'.format(name))
    os.mkdir('/export/home/{}/Desktop'.format(name))
    if image_types=='lms025187/webtop_itk':
        os.system('cp /export/data/Itk-snap.desktop /export/home/{}/Desktop'.format(name))
    elif image_types=='lms025187/webtop_matlab':
        os.system('cp /export/data/Matlab.desktop /export/home/{}/Desktop'.format(name))
    elif image_types=='lms025187/webtop_bio_software':
        os.system('cp /export/data/Orange.desktop /export/home/{}/Desktop'.format(name))
    elif image_types=='lms025187/webtop_image_captioning':
        os.system('cp /export/data/CLC\ Genomics\ Workbench\ 23.desktop /export/home/{}/Desktop'.format(name))
    f.write("#SBATCH --ntasks={}\n".format(ntasks_num))
    f.write("#SBATCH --cpus-per-task={}\n".format(cpus_per_task))
    f.write("#SBATCH --mem={}gb\n".format(mem_number))
    #f.write("#SBATCH --begin={}\n".format("2022-12-02T00:00:00"))
    #f.write("#SBATCH --begin={}\n".format("now"))
    f.write("#SBATCH --begin={}\n".format(opentimeformat))
    f.write("#SBATCH --output=/home/ccllab/Desktop/Job_finished/output{}.log\n".format(name))
    f.write("#SBATCH --partition=COMPUTE1Q\n")
    f.write("#SBATCH --account=root\n")
    f.write("/usr/bin/ssh -N -f -R {0}:localhost:{1} ccllab-virtual-machine\n".format(port,port))
    f.write('docker run -d --security-opt seccomp=unconfined --name={0} -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p {1}:3000 --shm-size="5gb" -v /mnt/home/{2}:/config --restart unless-stopped {3}\n'.format(docker_name, port, name ,image_types))
    f.close()    
    # change file owner, group and priority
    # os.system(change_fileowner)
    # os.system(change_filegroup)
    # os.system(change_priority)
    
    #submit create job & update database
    task_create=subprocess.Popen('/home/ccllab/task/create_active.sh {}'.format(name),shell=True,stdout=subprocess.PIPE)
    # task_create=subprocess.Popen('/home/minghsuan/task/create_active.sh {} {} {} {} {} {} {} {}'.format(name,docker_name,port,image_types,ntasks_num,cpus_per_task,mem_number,opentimeformat),shell=True,stdout=subprocess.PIPE)
    # stdout.read() return type: byte ,ex:b'12345\n' ,use decode() convert them to str,use [:-1] remove '\n'
    task_create_id=task_create.stdout.read().decode('ascii')[:-1]
    slurmjobs=slurmjobs+task_create_id+","

    # Save data into Database.
    user_datas = User.objects.get(username = user_name)
    # data_job = user_datas.job_set.create(jobname=name, imagetype=image_name, createdate=datetime.now(),
    #                                      webtopurl=port, jobid=int(name), mem_num=mem_number, 
    #                                      cpu_core=cpus_per_task, gpu_num=ntasks_num, status='processing',)
    data_job = user_datas.job_set.create(jobname=name, imagetype=image_name, createdate=datetime.now(),
                                         webtopurl=port, jobid=int(name), mem_num=mem_number, 
                                         cpu_core=cpus_per_task, gpu_num=ntasks_num, status='processing',remark=remark)
    data_job.save()
    
    
    #submit delete job & update database
    if scheduletype =='specifictime':
        #加入定時刪除任務
        task_delete_id=run_delete(name,docker_name,closetimeformat)
        slurmjobs=slurmjobs+task_delete_id+","
        #update schedule table
        job_datas = Job.objects.get(jobname = name)
        data_schedule = job_datas.schedule_set.create(expectopentime=opentimeformat,expectclosetime=closetimeformat,scheduleid=name,slurmjobs=slurmjobs)
        data_schedule.save()
    # elif scheduletype =='looptime':
    #     job_datas = Job.objects.get(jobname = name)
        
    return image_types ,slurmjobs

@login_required
@ensure_csrf_cookie
def IndexView(request):
    return render(request, 'build/index.html')

@api_view(['GET'])
def lab_lsit(request):
    lab = Group.objects.all()

    return Response(lab.values('name'))

@api_view(['POST'])
def user_list(request):
    data = json.loads(request.body.decode('utf-8'))
    userclass = User.objects.filter(groups__name=data['lab'])
    userlist = []
    for user in userclass:
        userlist.append({'name':user.username})
    return Response(userlist)
    

@ensure_csrf_cookie
def current_user(request):
    user = request.user
    level = User.objects.get(username=user).permission_level
    return JsonResponse({
        'username' : user.username,
        'email':user.email,
        'level':level,
    })

@ensure_csrf_cookie
def create_active(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    amount=int(data['amount'])
    for i in range(amount):
        task=subprocess.Popen('srun getAvailablePort',shell=True,stdout=subprocess.PIPE)
        # stdout.read() return type: byte ,ex:b'12345\n' ,use decode() convert them to str,use [:-1] remove '\n'
        port=task.stdout.read().decode('ascii')[:-1]

        #path Variable
        user_group = 'yanglab'
        user_name = request.user.username
        format_datetime = "%Y%m%d%H%M%S"
        name  = (datetime.now().strftime(format_datetime)) + str(random.randint(100,999))
        # mv_file = 'mv /home/minghsuan/Desktop/Job_queue/job{}.sh /home/minghsuan/Desktop/Job_finished'.format(name)
        # sbatch_file = 'sbatch /home/minghsuan/Desktop/Job_finished/job{0}.sh'.format(name)

        #file produce and execute
        image_types, slurmjobs = file_write_function(data, name, user_group, port, user_name)
        status_web = {'port' : port ,'taskid':slurmjobs}
    #return HttpResponseRedirect(reverse('app:index')) #The reverse var. is names of path from urls.py
    return JsonResponse(status_web)


##yang1018
@csrf_exempt
def task_reboot(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    
    
    job_name=data['jobname']

    usr = request.user.username
    job_info=list(Job.objects.filter(jobname=job_name).values("jobname","imagetype"))[0] 
    containername="{}_{}_{}".format(usr,job_info['imagetype'],job_info['jobname'])
    task_id=run_reboot(job_name,containername)
    
    task_status=""
    while task_status!="COMPLETED":
        if task_status=="FAILED" or task_status=="TIMEOUT":
            break
        status_check=subprocess.Popen('sacct --jobs {} --format=JobName,State|grep {}|awk {}'.format(task_id,"reboot","{'print $2'}"),shell=True,stdout=subprocess.PIPE)
        task_status=status_check.stdout.read().decode('ascii')[:-1]
        time.sleep(1)
    #show specific job info
    # sele_job_info=list(Job.objects.filter(jobname=job_name).values("jobname","status")) 
    #update status
    #update_status=Job.objects.filter(jobname=job_name).update(status="processing")
    #update_status=Job.objects.filter(jobname='20221101131712617').delete()
    
    
    
    jr = {
            'jobname':job_name,
            # 'container':containerid,
            'action':'reboot',
            'taskid':task_id,
            'taskstatus':task_status,
            'containername':containername
            # 'sele':sele_job_info,
            #'update':update_status,
         }
    #reloadjob= {'jobname':jobname}
    return JsonResponse(jr)
@csrf_exempt
def task_delete(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    
    job_name=data['jobname']
    
    usr = request.user.username
    job_info=list(Job.objects.filter(jobname=job_name).values("jobname","imagetype"))[0] 
    containername="{}_{}_{}".format(usr,job_info['imagetype'],job_info['jobname'])
    task_id=run_delete(job_name,containername)
    
    jr = {
            'jobname':job_name,
            #'container':containerid,
            'action':'delete',
            #'taskid':task_id,
            #'taskstatus':task_status,
         }
    return JsonResponse(jr)
@csrf_exempt
def task_commit(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    
    job_name=data['jobname']

    usr = request.user.username
    job_info=list(Job.objects.filter(jobname=job_name).values("jobname","imagetype"))[0] 
    containername="{}_{}_{}".format(usr,job_info['imagetype'],job_info['jobname'])
    #commit需要同時操作usr的app_job,app_sleepjob 多傳var usr
    task_id=run_commit(usr,job_name,containername)
    
    
    jr = {
            'jobname':job_name,
            # 'container':containerid,
            'action':'commit',
            'taskid':task_id,
            #'taskstatus':task_status,
         }
    return JsonResponse(jr)
    
@csrf_exempt    
def task_sleep_delete(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    
    job_name=data['jobname']
    usr = request.user.username
    job_info=list(SleepJob.objects.filter(jobname=job_name).values("jobname","imagetype"))[0] 
    containername="{}_{}_{}".format(usr,job_info['imagetype'],job_info['jobname'])
    task_id=run_sleep_delete(job_name,containername)
    
    jr = {
            'jobname':job_name,
            # 'container':containerid,
            'action':'sleep_delete',
            'taskid':task_id,
            #'taskstatus':task_status,
         }
    return JsonResponse(jr)

@csrf_exempt    
def task_schedule_delete(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    
    schedule_id=data['scheduleid']

    update_job,update_schedule=run_schedule_delete(schedule_id)
    jr = {
            # 'slurm':slurmjob_list,
            # 'jobname':job_name,
            # 'container':containerid,
            'action':'schedule_delete',
            'scheduleid':schedule_id,
            # 'taskid':task_id,
            #'taskstatus':task_status,
         }
    return JsonResponse(jr)
@csrf_exempt    
def task_schedule_update(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    #前端只有這個request的ID是大寫
    # schedule_id=data['scheduleid']
    schedule_id=data['scheduleID']
    usr = request.user.username
    #step1 get new start/close time
    schedule=data['schedule']
    scheduletype=schedule['type']
    if scheduletype =='specifictime':
        opentime=schedule['info']['expectopentime']
        closetime=schedule['info']['expectclosetime']
        opsplit = opentime.split("-")
        cssplit = closetime.split("-")
        #整理成slurm要求的格式為西元年-月-日T時:分:秒(2022-12-02T12:30:00) 如果年/月/日/時/分/秒只有個位數 十位數缺少0需要補上slurm才認得
        opentimeformat = "{:0>4}-{:0>2}-{:0>2}T{:0>2}:{:0>2}:{:0>2}".format(opsplit[0],opsplit[1],opsplit[2],opsplit[3],opsplit[4],"00")
        closetimeformat = "{:0>4}-{:0>2}-{:0>2}T{:0>2}:{:0>2}:{:0>2}".format(cssplit[0],cssplit[1],cssplit[2],cssplit[3],cssplit[4],"00")
    #step2 rm container?
    #step3 rm old slurm job
    scheduld_info=list(Schedule.objects.filter(scheduleid=schedule_id).values("slurmjobs","expectopentime","expectclosetime"))[0]
    ori_open=scheduld_info['expectopentime']
    ori_close=scheduld_info['expectclosetime']
    slurmjobs=scheduld_info['slurmjobs']
    slurmjob_list=slurmjobs.split(",")
    for job in slurmjob_list:
        if job != "":
            task=subprocess.Popen("scancel "+job,shell=True,stdout=subprocess.PIPE)
    #step4 sbatch new slurm job
    
    job_info=list(Job.objects.filter(jobname=schedule_id).values("jobname","imagetype"))[0] 
    containername="{}_{}_{}".format(usr,job_info['imagetype'],job_info['jobname'])
    
    task_update=subprocess.Popen('sed -i "s/{}/{}/g" /home/ccllab/Desktop/Job_finished/job{}.sh'.format(ori_open,opentimeformat,schedule_id),shell=True,stdout=subprocess.PIPE)
    task_create=subprocess.Popen('sbatch --parsable /home/ccllab/Desktop/Job_finished/job{}.sh'.format(schedule_id),shell=True,stdout=subprocess.PIPE)
    create_id=task_create.stdout.read().decode('ascii')[:-1]
    
    delete_id=run_delete(schedule_id,containername,closetimeformat)
        
    #step5 update app_schedule table
    update_status=Schedule.objects.filter(scheduleid=schedule_id).update(expectopentime=opentimeformat,expectclosetime=closetimeformat,slurmjobs=create_id+","+delete_id)
    
    # update_job,update_schedule=run_schedule_delete(schedule_id)
    jr = {
            'slurmjobs':slurmjob_list,
            # 'jobname':job_name,
            'container':containername,
            'action':'schedule_update',
            'scheduleid':schedule_id,
            'ori_open':ori_open,
            'ori_close':ori_close,
            'opentimeformat':opentimeformat,
            'closetimeformat':closetimeformat,
            # 'taskid':task_id,
            #'taskstatus':task_status,
         }
    return JsonResponse(jr)

@csrf_exempt    
def task_sleep_rebuild(request):
    #用create_active開container
    jsonresponse=create_active(request)
    #根據create_active回傳的json檔 取得開container的task id ,task_sleep_rebuild會等container開完才response
    bytestring=jsonresponse.content
    data=json.loads(bytestring.decode('utf-8'))
    task_id=data['taskid']
    
    task_status=""
    while task_status!="COMPLETED":
        if task_status=="FAILED" or task_status=="TIMEOUT":
            break
        status_check=subprocess.Popen('sacct --jobs {} --format=JobName,State|grep {}|awk {}'.format(task_id,"job","{'print $2'}"),shell=True,stdout=subprocess.PIPE)
        task_status=status_check.stdout.read().decode('ascii')[:-1]
        time.sleep(1)
    jr = {
            'action':'rebuild',
            'taskid':task_id,
            'taskstatus':task_status,
            #'str':str(jsonresponse.content)
         }
    return JsonResponse(jr)

    
def update_db_status():
    #20230720 以前用sbatch丟可以 因為ctl,cmp1共用home目錄 現在照用的話 ctl讀不到寫在cmp1的output_job_status.log 改成用srun跑
    cmd="srun docker ps -a --format \"{{.Status}}\t{{.Names}}\""
    status_check=subprocess.Popen((cmd),shell=True,stdout=subprocess.PIPE)
    #print(status_check)
    out=status_check.stdout.read().decode('ascii')[:-1]
    fo=out.split("\n")
    for line in fo:
        #print(line)
        job_status = line.split("\t")[0]
        #print(job_status)                          
        job_name = line.split("\t")[1].split("_")[-1][:-1]    
        print(job_name)   
        if job_name=="20230719172357874":
            print("hit")                
        #update_status=Job.objects.filter(jobname=job_name).update(status=job_status)
        #print(update_status)
    
    
    #sbatch_file = 'sbatch /home/ccllab/task/job_status.sh'
    #os.system(sbatch_file)
    #time.sleep(10) # in order to prevent sending before that sbatch-file produced
    #fo = open('/home/ccllab/task/task_finished/output_job_status.log','r')
    #for line in fo.readlines():                      
        #job_status = line.split("\t")[0]                          
        #job_name = line.split("\t")[1].split("_")[-1][:-1]                       
        #update_status=Job.objects.filter(jobname=job_name).update(status=job_status)
    #fo.close()
    


@ensure_csrf_cookie
def sleepjob_page(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    usr = request.user.username
    usr_email = request.user.email
    #usr_db = User.objects.get(email=usr_email)
    #usr_all_job = list(usr_db.sleepjob_set.all().values("jobname","sleepdate"))
    usr_all_job= list(SleepJob.objects.filter(user__email=usr_email).values("jobname","sleepdate","remark"))
    
    return JsonResponse(usr_all_job, safe=False)

@ensure_csrf_cookie
def schedule_page(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    usr = request.user.username
    usr_email = request.user.email
    #用foreign key反向查詢 
    usr_all_schedule= list(Schedule.objects.filter(job__user__email=usr_email).all().values("expectopentime","expectclosetime","scheduleid"))
    
    #排程自動刪除時 container會被刪除 但是job instance會留著 一直卡在任務總覽中
    for schedule in usr_all_schedule:
        closetime=schedule['expectclosetime']
        scheduleid=schedule['scheduleid']
        date = datetime.strptime(closetime, '%Y-%m-%dT%H:%M:%S')
        #避免刪job時container還沒刪 緩衝時間一分鐘
        if date < datetime.now()-timedelta(minutes=1):
            run_schedule_delete(scheduleid)


    return JsonResponse(usr_all_schedule, safe=False)

@ensure_csrf_cookie
def status_page(request):
    data = json.loads(request.body.decode('utf-8')) # get json lib. from frontend post
    #update_db_status()
    usr = request.user.username
    usr_email = request.user.email
    #usr_db = User.objects.get(email=usr_email)
    #usr_all_job = list(usr_db.job_set.all().values("imagetype","createdate","jobname","webtopurl","status"))
    #usr_all_job= list(Job.objects.filter(user__email=usr_email).exclude(status="processing").values("imagetype","createdate","jobname","webtopurl","status","remark"))
    usr_all_job= list(Job.objects.filter(user__email=usr_email).values("imagetype","createdate","jobname","webtopurl","status","remark"))

    
    return JsonResponse(usr_all_job, safe=False)

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/')
