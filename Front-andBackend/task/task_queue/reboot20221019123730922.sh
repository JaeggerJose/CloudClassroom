#!/bin/bash
#SBATCH --job-name=reboot20221019123730922
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/outpu_reboot20221019123730922.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 56febf64b36b
docker start 56febf64b36b
