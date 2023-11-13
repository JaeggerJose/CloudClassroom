#!/bin/bash
#SBATCH --job-name=job20230720105427975
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230720105427975.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run -d --security-opt seccomp=unconfined --name=lolab_lee_webtop_orange3_CLC_20230720105427975 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 10178:3000 --shm-size="5gb" -v /mnt/home/20230720105427975:/config --restart unless-stopped lms025187/webtop_bio_software
