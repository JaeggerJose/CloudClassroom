#!/bin/bash
#SBATCH --job-name=job20230719184635160
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230719184635160.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run -d --security-opt seccomp=unconfined --name=minghsuan_webtop_3dslicer_20230719184635160 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 10164:3000 --shm-size="5gb" -v /mnt/home/20230719184635160:/config --restart unless-stopped lms025187/webtop_image_captioning
