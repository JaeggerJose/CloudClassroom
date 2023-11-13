#!/bin/bash
cp /home/ccllab/task/sample_create.sh /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<jobname>/$1/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<docker_name>/$2/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<port>/$3/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<image_types>/$4/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<ntasks_num>/$5/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<cpus_per_task>/$6/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<mem_number>/$7/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i "s/<opentimeformat>/$8/g" /home/ccllab/Desktop/Job_queue/job$1.sh
sed -i 's/\r//' /home/ccllab/Desktop/Job_queue/job$1.sh

chown <user_name>:<user_group> /home/ccllab/Desktop/Job_queue/job$1.sh
chmod 770 -R /home/ccllab/Desktop/Job_queue/job$1.sh
    
