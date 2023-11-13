#!/bin/bash
#SBATCH --job-name=commit20221107142723249
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107142723249.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 94d6e4e81cf6 20221107142723249:latest
docker save -o /home/minghsuan/task/commit_tar/20221107142723249.tar 20221107142723249:latest
docker rm -f 94d6e4e81cf6
