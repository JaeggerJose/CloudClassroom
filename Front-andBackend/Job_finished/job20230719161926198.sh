#!/bin/bash
#SBATCH --job-name=job20230719161926198
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230719161926198.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run -d --name=minghsuan_webtop_3dslicer_20230719161926198 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 18980:3000 --shm-size="5gb" webtop_3dslicer
