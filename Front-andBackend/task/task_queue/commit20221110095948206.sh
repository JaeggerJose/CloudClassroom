#!/bin/bash
#SBATCH --job-name=commit20221110095948206
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221110095948206.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p a4d5187d03c8 20221110095948206:latest
docker save -o /home/minghsuan/task/commit_tar/20221110095948206.tar 20221110095948206:latest
docker rm -f a4d5187d03c8
