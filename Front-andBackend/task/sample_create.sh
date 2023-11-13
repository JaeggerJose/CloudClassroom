#!/bin/bash
#SBATCH --job-name=job<jobname>
#SBATCH --ntasks=<ntasks_num>
#SBATCH --cpus-per-task=<cpus_per_task>
#SBATCH --mem=<mem_number>gb
#SBATCH --begin=<opentimeformat>
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output<jobname>.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run --gpus all -d --name=<docker_name> -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p <port>:3000 --shm-size="5gb" <image_types>
    