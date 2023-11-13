#!/bin/bash
#SBATCH --job-name=reboot<jobname>
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot<jobname>.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop <containerid>
docker start <containerid>
