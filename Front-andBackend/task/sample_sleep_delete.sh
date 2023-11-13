#!/bin/bash
#SBATCH --job-name=sleep_delete<jobname>
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=<starttime>
#SBATCH --output=/home/ccllab/task/task_finished/output_sleep_delete<jobname>.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm <jobname>:latest
rm /home/ccllab/task/commit_tar/<jobname>.tar
