#!/bin/bash
#SBATCH --job-name=job20230719114115801
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230719114115801.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run --gpus all -d --name=minghsuan_webtop_orange3_CLC_20230719114115801 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p :3000 --shm-size="5gb" lms025187/webtop_bio_software
