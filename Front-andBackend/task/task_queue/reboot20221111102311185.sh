#!/bin/bash
#SBATCH --job-name=reboot20221111102311185
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221111102311185.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 2925f5056a0c
docker start 2925f5056a0c
