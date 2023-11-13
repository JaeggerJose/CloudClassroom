#!/bin/bash
#SBATCH --job-name=job20230719170103838
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/Desktop/Job_finished/output20230719170103838.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker run -d --name=minghsuan_webtop_itksnap_20230719170103838 -e PUID=1000 -e PGID=1000 -e TZ=Asia/Taipei -p 18395:3000 --shm-size="5gb" lms025187/webtop_itk
