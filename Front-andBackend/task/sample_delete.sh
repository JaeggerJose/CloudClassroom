#!/bin/bash
#SBATCH --job-name=delete<jobname>
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=<starttime>
#SBATCH --output=/home/ccllab/task/task_finished/output_delete<jobname>.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f <containerid>
