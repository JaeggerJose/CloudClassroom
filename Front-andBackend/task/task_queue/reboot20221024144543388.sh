#!/bin/bash
#SBATCH --job-name=reboot20221024144543388
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/outpu_reboot20221024144543388.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 5997fb38768e
docker start 5997fb38768e
