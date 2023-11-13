#!/bin/bash
#SBATCH --job-name=commit20221102100741511
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102100741511.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit e659b5562d9c 20221102100741511:latest
docker save -o /home/minghsuan/task/commit_tar/20221102100741511.tar 20221102100741511:latest
docker rm -f e659b5562d9c
