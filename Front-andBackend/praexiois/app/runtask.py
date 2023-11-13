import subprocess

from django.contrib.auth.models import User
from .models import Job ,SleepJob,Schedule, AxtasyUser
from datetime import datetime
'''
run_xxx:透過slurm 操作docker container ,並更新sqlite db 完成後return slurm_jobid
'''

def run_reboot(job_name,containerid,time="now"):
    task=subprocess.Popen('/home/minghsuan/task/run_{}.sh {} {} {}'.format("reboot",job_name,containerid,time),shell=True,stdout=subprocess.PIPE)
    # stdout.read() return type: byte ,ex:b'12345\n' ,use decode() convert them to str,use [:-1] remove '\n'
    task_id=task.stdout.read().decode('ascii')[:-1]
    return task_id

def run_commit(user_name,job_name,containerid,time="now"):
    task=subprocess.Popen('/home/minghsuan/task/run_{}.sh {} {} {}'.format("commit",job_name,containerid,time),shell=True,stdout=subprocess.PIPE)
    # stdout.read() return type: byte ,ex:b'12345\n' ,use decode() convert them to str,use [:-1] remove '\n'
    task_id=task.stdout.read().decode('ascii')[:-1]
    
    #show specific job info (type: dict)
    job_info=list(Job.objects.filter(jobname=job_name).values("mem_num","cpu_core","gpu_num","imagetype","remark"))[0] 
    #add sleepjob to table app_sleepjob 
    user_datas = User.objects.get(username = user_name)
    data_job = user_datas.sleepjob_set.create(jobname=job_name,imagetype=job_info['imagetype'],sleepdate=datetime.now(),jobid=int(job_name), mem_num=job_info['mem_num'], cpu_core=job_info['cpu_core'], gpu_num=job_info['gpu_num'],remark=job_info['remark'])
    
    #update status
    update_status=Job.objects.filter(jobname=job_name).delete()
    return task_id

def run_delete(job_name,containerid,time="now"):
    task=subprocess.Popen('/home/ccllab/task/run_{}.sh {} {} {}'.format("delete",job_name,containerid,time),shell=True,stdout=subprocess.PIPE)
    task_id=task.stdout.read().decode('ascii')[:-1]
    #update status
    if time=="now":
        update_status=Job.objects.filter(jobname=job_name).delete()
    return task_id

def run_sleep_delete(job_name,containerid,time="now"):
    task=subprocess.Popen('/home/ccllab/task/run_{}.sh {} {} {}'.format("sleep_delete",job_name,containerid,time),shell=True,stdout=subprocess.PIPE)
    # stdout.read() return type: byte ,ex:b'12345\n' ,use decode() convert them to str,use [:-1] remove '\n'
    task_id=task.stdout.read().decode('ascii')[:-1]
    
    #update status
    if time=="now":
        update_status=SleepJob.objects.filter(jobname=job_name).delete()
    return task_id
def run_schedule_delete(schedule_id):
    #step1 .del slurm job 
    scheduld_info=list(Schedule.objects.filter(scheduleid=schedule_id).values("slurmjobs"))[0]
    slurmjobs=scheduld_info['slurmjobs']
    slurmjob_list=slurmjobs.split(",")[:-1]
    for job in slurmjob_list:
        task=subprocess.Popen("scancel "+job,shell=True,stdout=subprocess.PIPE)
    #step1 .del container
    # job_info=list(Job.objects.filter(jobname=schedule_id).values("jobname","imagetype"))[0] 
    # containername="{}_{}_{}".format(usr,job_info['imagetype'],job_info['jobname'])
    
    # taskid=run_delete(schedule_id,containerid,time="now")

    #step2 .del job instance
    update_job=Job.objects.filter(jobname=schedule_id).delete()
    #step3 .del app_schedule
    update_schedule=Schedule.objects.filter(scheduleid=schedule_id).delete()
    return update_job,update_schedule

def job_content(job_name):
    job_info=list(Job.objects.filter(jobname=job_name).values("jobname","status")) 
    print(job_info)
    return job_info
