#!/bin/bash
#SBATCH --job-name=reboot<jobname>
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=<starttime>
#SBATCH --output=/home/ccllab/task/task_finished/output_reboot<jobname>.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker restart <containerid>
