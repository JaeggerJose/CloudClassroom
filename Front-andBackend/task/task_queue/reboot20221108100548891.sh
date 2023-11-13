#!/bin/bash
#SBATCH --job-name=reboot20221108100548891
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221108100548891.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 02438bfec4b4
docker start 02438bfec4b4
