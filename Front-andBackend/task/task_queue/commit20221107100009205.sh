#!/bin/bash
#SBATCH --job-name=commit20221107100009205
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107100009205.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p ba85ad6b7745 20221107100009205:latest
docker save -o /home/minghsuan/task/commit_tar/20221107100009205.tar 20221107100009205:latest
docker rm -f ba85ad6b7745
