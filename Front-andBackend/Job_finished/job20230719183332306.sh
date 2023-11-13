#!/bin/bash
#SBATCH --job-name=job20230719183332306
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230719183332306.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run -d --security-opt seccomp=unconfined --name=minghsuan_webtop_3dslicer_20230719183332306 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 17355:3000 --shm-size="5gb" -v /mnt/home/20230719183332306:/config --restart unless-stopped webtop_3dslicer
