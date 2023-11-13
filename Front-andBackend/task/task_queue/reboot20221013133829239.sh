#!/bin/bash
#SBATCH --job-name=reboot20221013133829239
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/outpu_reboot20221013133829239.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 341a242fe2ae
docker start 341a242fe2ae
