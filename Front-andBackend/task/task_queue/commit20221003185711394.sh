#!/bin/bash
#SBATCH --job-name=commit20221003185711394
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221003185711394.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 7bb45227bc36 20221003185711394:latest
docker save -o /home/minghsuan/task/commit_tar/20221003185711394.tar 20221003185711394:latest
docker rm -f 7bb45227bc36
