#!/bin/bash
cp /home/ccllab/task/sample_sleep_delete.sh /home/ccllab/task/task_queue/sleep_delete$1.sh 
sed -i "s/<jobname>/$1/g" /home/ccllab/task/task_queue/sleep_delete$1.sh
sed -i "s/<containerid>/$2/g" /home/ccllab/task/task_queue/sleep_delete$1.sh
sed -i "s/<starttime>/$3/g" /home/ccllab/task/task_queue/sleep_delete$1.sh
sed -i 's/\r//' /home/ccllab/task/task_queue/sleep_delete$1.sh
jobid=$(sbatch --parsable /home/ccllab/task/task_queue/sleep_delete$1.sh)
echo $jobid
