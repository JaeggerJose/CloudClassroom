#!/bin/bash
#SBATCH --job-name=reboot20221107162819143
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221107162819143.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 923cdc66fd21
docker start 923cdc66fd21
