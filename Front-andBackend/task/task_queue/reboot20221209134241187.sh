#!/bin/bash
#SBATCH --job-name=reboot20221209134241187
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221209134241187.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 6f8797f5280a
docker start 6f8797f5280a
