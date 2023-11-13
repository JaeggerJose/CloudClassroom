#!/bin/bash
#SBATCH --job-name=reboot20221220090743910
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221220090743910.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker restart 17c9fe75efaf
