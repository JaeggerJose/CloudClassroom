#!/bin/bash
#SBATCH --job-name=job1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output1.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run --gpus all -d --name=con1 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 13749:3000 --shm-size="5gb" e529ed17634f
    