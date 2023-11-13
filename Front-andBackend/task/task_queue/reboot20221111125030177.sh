#!/bin/bash
#SBATCH --job-name=reboot20221111125030177
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221111125030177.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 0b67c7b9650c
docker start 0b67c7b9650c
