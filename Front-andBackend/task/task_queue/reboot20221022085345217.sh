#!/bin/bash
#SBATCH --job-name=reboot20221022085345217
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/outpu_reboot20221022085345217.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop cbe498a879bb
docker start cbe498a879bb
