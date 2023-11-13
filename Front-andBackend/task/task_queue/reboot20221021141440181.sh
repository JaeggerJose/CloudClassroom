#!/bin/bash
#SBATCH --job-name=reboot20221021141440181
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/outpu_reboot20221021141440181.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 24eb86801489
docker start 24eb86801489
