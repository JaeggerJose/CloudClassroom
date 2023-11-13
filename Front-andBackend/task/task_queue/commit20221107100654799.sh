#!/bin/bash
#SBATCH --job-name=commit20221107100654799
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107100654799.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 6e6d51f7635c 20221107100654799:latest
docker save -o /home/minghsuan/task/commit_tar/20221107100654799.tar 20221107100654799:latest
docker rm -f 6e6d51f7635c
