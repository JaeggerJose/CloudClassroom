#!/bin/bash
#SBATCH --job-name=reboot20221103101725379
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221103101725379.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 652a0f007f8e
docker start 652a0f007f8e
