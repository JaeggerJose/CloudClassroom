#!/bin/bash
#SBATCH --job-name=reboot20221108100543719
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221108100543719.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 7cd433f87ee9
docker start 7cd433f87ee9
