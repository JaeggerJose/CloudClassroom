#!/bin/bash
#SBATCH --job-name=job20230720121838558
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230720121838558.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run -d --security-opt seccomp=unconfined --name=ccllab_minghsuan_webtop_itksnap_20230720121838558 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 10151:3000 --shm-size="5gb" -v /mnt/home/20230720121838558:/config --restart unless-stopped lms025187/webtop_itk
