# Master Node
# install MUNGE
`apt-get install -y munge`
`service munge start`

copy `/etc/munge/munge.key` to **ALL** nodes

# install Database for accounting
```bash
apt-get install -y mariadb-server # install mariadb
service mysql start # start mysql
mysql -u root # set database for slurm
  create database slurm_acct_db;
  create user 'slurm'@'localhost';
  set password for 'slurm'@'localhost' = password('slurmdbpass');
  grant usage on *.* to 'slurm'@'localhost';
  grant all privileges on slurm_acct_db.* to 'slurm'@'localhost';
  flush privileges;
  exit
apt-get install -y slurmctld slurmdbd # install slurm db and controller
```
## Slurm DBD setting
```bash
vim /etc/slurm-llnl/slurmdbd.conf

chown slurm:slurm /etc/slurm-llnl/slurmdbd.conf
```
## Start Slurmdbd
`systemctl start slurmdbd`  

if `fatal: You need to add this cluster to accounting if you want to enforce associations, or no jobs will ever run.` occur means that we have to [add cluster to database manually](https://www.reddit.com/r/SLURM/comments/g2koaw/slurmctld_fails_to_run/).

`sacctmgr add cluster <cluster name>`

*when you run wiht wrong ClusterName, cd to /var/lib/slurm-llnl/slurmctld to delete the File clustername.*

`rm /var/lib/slurm-llnl/slurmctld/clustername`

# Slurmctld Config
## Slurm.conf (the content need to be exactly identical for each node)
```conf
# slurm.conf file generated by configurator.html.
# Put this file on all nodes of your cluster.
# See the slurm.conf man page for more information.
#
SlurmctldHost=a100
SlurmctldAddr=10.0.3.104
ProctrackType=proctrack/cgroup
ReturnToService=1
SlurmctldPidFile=/run/slurmctld.pid
SlurmctldPort=6817
SlurmdPidFile=/run/slurmd.pid
SlurmdPort=6818
SlurmdSpoolDir=/var/lib/slurm-llnl/slurmd
SlurmUser=slurm
StateSaveLocation=/var/lib/slurm-llnl/slurmctld
SwitchType=switch/none
TaskPlugin=task/affinity,task/cgroup
TaskPluginParam=Sched
# TIMERS
InactiveLimit=0
KillWait=30
MinJobAge=300
SlurmctldTimeout=120
SlurmdTimeout=300
Waittime=0
# SCHEDULING
FastSchedule=1
SchedulerType=sched/backfill
SelectType=select/cons_res
SelectTypeParameters=CR_Core
# JOB PRIORITY
PriorityType=priority/multifactor
# This determines the contribution of historical usage on the composite usage value. The larger the number, the longer past usage affects fair-share. If set to 0 no decay will be applied. This is helpful if you want to enforce hard time limits per association. If set to 0 PriorityUsageResetPeriod must be set to some interval. The unit is a time string (i.e. min, hr:min:00, days-hr:min:00, or days-hr). The default value is 7-0 (7 days).
PriorityDecayHalfLife=7-0
# The period of time in minutes in which the half-life decay will be re-calculated. The default value is 5 (minutes).
PriorityCalcPeriod=5
# A boolean that sets the polarity of the job size factor. The default setting is NO which results in larger node sizes having a larger job size factor. Setting this parameter to YES means that the smaller the job, the greater the job size factor will be.
PriorityFavorSmall=NO
# Specifies the queue wait time at which the age factor maxes out. The unit is a time string (i.e. min, hr:min:00, days-hr:min:00, or days-hr). The default value is 7-0 (7 days).
PriorityMaxAge=7-0
# An unsigned integer that scales the contribution of the age factor.
PriorityWeightAge=1000
PriorityWeightFairshare=1500
PriorityWeightJobSize=1000
PriorityWeightPartition=1500
PriorityWeightQOS=1000
PriorityWeightTRES=CPU=1000,Mem=1000,GRES/gpu:A100-SXM4-40GB=3000

# LOGGING AND ACCOUNTING
AccountingStorageEnforce=associations
AccountingStorageType=accounting_storage/slurmdbd
AccountingStorageTRES=gres/gpu,gres/gpu:A100-SXM4-40GB
AccountingStoreJobComment=YES
ClusterName=dynomics
JobAcctGatherFrequency=30
JobAcctGatherType=jobacct_gather/none
SlurmctldDebug=info
SlurmctldLogFile=/var/log/slurm-llnl/slurmctld.log
SlurmdDebug=info
SlurmdLogFile=/var/log/slurm-llnl/slurmd.log

# COMPUTE NODES
GresTypes=gpu
NodeName=dynomics NodeAddr=10.0.3.1 CPUs=256 State=UNKNOWN Gres=gpu:8 RealMemory=900000
PartitionName=COMPUTE1Q Nodes=dynomics Default=NO Priority=1 DefMemPerNode=16000 TRESBillingWeights="CPU=1.0,Mem=0.25G,GRES/gpu:A100-SXM4-40GB=16.0"  MaxTime=4-0 State=UP
PartitionName=TEST Nodes=dynomics Default=YES Priority=65533 MaxTime=10:00 State=UP
PartitionName=ADMINQ Nodes=dynomics Default=NO Priority=65533 MaxTime=INFINITE State=UP AllowAccounts=root
```

## Update Slurm state when it struggle in drain state but all of these config is fixed.

`scontrol update nodename=dynomics state=resume`

## 開啟slurmctld服務
`systemctl start slurmctld`

## Config 補充
### Q: A100 不會統計job用了多少memory?
把 selectType改掉試試看
```conf
SelectType=select/cons_tres
selectTypeParameters=CR_Core_Memory
```
改完記得把 controller跟nodes上的服務都重開
```bash
systemctl restart slurmctld (controller)
systemctl restart slurmd (nodes)
```
### Q: Submit job 時如果不request memory 他可以無上限使用?
可以在 config file 裡面設置 DefMemPerNode 參數去預設job在這個node上可以用多少memory
目前(20220118)預設  
`DefMemPerNode=16000` (default 16G)

## 備註
這是master node(controller)上的設定 最重要的就是:
```conf
...
SlurmctldHost=a100
SlurmctldAddr=10.0.3.104
SlurmctldPort=6817
...
```
```bash
hostname # check the hostname of the master node
    a100
ip addr # check ips of the master node
```
Master Node 需要開啟6817 Port


# Import Database
```bash
# export database
mysqldump -u root -p slurm_acct_db > ~/slurm_acct_db.sql
# import database
mysql -u root -p slurm_acct_db < ~/slurm_acct_db.sql
```

# Submit jobs
1. srun
2. sbatch

## interactive mode
`srun -p TEST --pty bash`

# Commands for Controller and Accounting
## 設定修改後重新採用設定
`scontrol reconfigure`  

## 新增使用者或account
新增account lolab 作為 root account之child  
`sacctmgr add account name=lolab organization=nthuls parent=root cluster=dynomics partition=TEST fairshare=375 MaxJobs=300 priority=100`  
新增user stwong 在 root account 之下  
`sacctmgr add user name=stwong account=root adminlevel=admin cluster=dynomics`  
[Problem solutions by slurm user creation](https://hpc.pku.edu.cn/_book/guide/faq.html)

## 修正使用者或account屬性  
`sacctmgr modify user name=samuel set partition=TEST`  
`sacctmgr modify user where name=adam cluster=tux account=physics set maxjobs=2 maxwall=30:00`  

## 查看統計資訊  
看sacct有哪些屬性可以查看  
`sacct -e`  
show想看的欄位   
`sacct -o Account,JobID,ReqTRES,CPUTime,State,Submit,QOS,Partition,Priority,Reqgres`  
`sacct --format=User,ReqGRES,Start,End`  
`sacct --format="User,CPUTime,ReqGRES,Start,End,Job"`  
show特定job的詳細資訊  
`sacct --jobs 98 --long`  
查看以group為主的資源使用報告 (Tree表示分帳號層級輸出)  
`sreport cluster accountutilizationbyuser`  
查看以user為主的資源使用報告  
`sreport cluster userutilizationbyaccount`  
查看以user為主的所有設備的資源使用報告  
`sreport -T all cluster userutilizationbyaccount`  
查看以user為主的所有設備的資源使用報告指定從7/28的03:00到7/28的05:00   
`sreport -T all cluster userutilizationbyaccount Start=0728-03:00:00 End=0728-05:00:00`    
輸出成方便parse的格式 `-P`  
`sreport -P -T cpu,mem,gres/gpu,billing -t MinPer cluster AccountUtilizationByUser Tree Start=0901-00:00:00 End=1001-00:00:00`  
九月統計報表: 指定account=root, login欄位寬度10個char, Tree表示分帳號層級輸出   
`sreport -T cpu,mem,gres/gpu,billing -t MinPer cluster AccountUtilizationByUser Tree Accounts=root Start=0901-00:00:00 End=1001-00:00:00 Format=Account,Login%10,TresCount,TresName,Used`  
九月統計報表: 指定user=prx_samuel, login欄位寬度10個char  
`sreport -T cpu,mem,gres/gpu,billing -t MinPer cluster AccountUtilizationByUser Tree Users=prx_samuel Start=0901-00:00:00 End=1001-00:00:00 Format=Account%1,Login%10,TresCount,TresName,Used`  
九月統計報表: 輸出cpu及gpu整個月的利用率  
`sreport -T cpu,gres/gpu -t MinPer cluster Utilization Start=0901-00:00:00 End=1001-00:00:00`  
一月統計報表: 輸出cpu, mem及gpu整個月的利用率  
`sreport -T cpu,gres/gpu,mem -t MinPer cluster Utilization Start=2022-0101-00:00:00 End=2022-0201-00:00:00`

統計資訊的Tag  
Normal  
`-T` Trackable resource 後面可加入all、cpu、mem...取決於slurm.conf設定資源名稱  

OPTIONS FOR ALL REPORT TYPES

> `All_Clusters` 顯示所有運算電腦
> `Clusters=` 指定顯示運算電腦
> `start=` 開始時間
> `Ende=` 結束時間 (時間格式 月/日(/年)、月.日(.年)、月/日(/年)-時:分(:秒)、年-月-日)

FOR CLUSTER REPORTS  
  `accounts=` 輸出使用報告時，指定group，default為全部輸出  
  `users=` 輸出使用報告時，指定user，default為全部輸出  
  `Tree` 表示分帳號層級輸出


### You can get the exact resources (cpu numbers, memory, gres/gpus) allocated to a job using
`scontrol show -dd job <jobid>`
   

## Reference
[sacctmgr](https://slurm.schedmd.com/sacctmgr.html): Used to view and modify Slurm account information.  
[srun](https://slurm.schedmd.com/srun.html): Run parallel jobs  
[slurm guide book - chinese](http://hpc.pku.edu.cn/_book/guide/faq.html)  
[scontrol](https://slurm.schedmd.com/scontrol.html): view or modify Slurm configuration and state.  
[Quick Start Administrator Guide](https://slurm.schedmd.com/quickstart_admin.html)  
[accounting](https://slurm.schedmd.com/accounting.html)  
[sacct](https://slurm.schedmd.com/sacct.html): displays accounting data for all jobs and job steps in the Slurm job accounting log or Slurm database  
[sbatch](https://slurm.schedmd.com/sbatch.html): Submit a batch script to Slurm.  
[slurm.conf](https://slurm.schedmd.com/slurm.conf.html)  
[change uid needs to restart slurmctld](https://slurm.schedmd.com/faq.html#changed_uid)  
[salloc](https://slurm.schedmd.com/salloc.html)  
[TRES](https://slurm.schedmd.com/SLUG15/TRES.pdf)  
[tres](https://slurm.schedmd.com/tres.html)  
[sreport](https://slurm.schedmd.com/sreport.html): Generate reports from the slurm accounting data.  
[Convenient SLURM Commands](https://docs.rc.fas.harvard.edu/kb/convenient-slurm-commands/): Harvard slurm commands compilaton.  

# Debug mode
```bash
slurmctld -Dcv
slurmctld -Dcvv
slurmctld -Dcvvv
```

# Email service 