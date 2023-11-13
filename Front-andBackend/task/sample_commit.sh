#!/bin/bash
#SBATCH --job-name=commit<jobname>
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=<starttime>
#SBATCH --output=/home/ccllab/task/task_finished/output_commit<jobname>.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p <containerid> <jobname>:latest
docker save -o /home/ccllab/task/commit_tar/<jobname>.tar <jobname>:latest
docker rm -f <containerid>
