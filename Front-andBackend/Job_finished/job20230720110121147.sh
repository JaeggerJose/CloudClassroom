#!/bin/bash
#SBATCH --job-name=job20230720110121147
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230720110121147.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run -d --security-opt seccomp=unconfined --name=ccllab_minghsuan_webtop_matlab_20230720110121147 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 10203:3000 --shm-size="5gb" -v /mnt/home/20230720110121147:/config --restart unless-stopped lms025187/webtop_matlab
