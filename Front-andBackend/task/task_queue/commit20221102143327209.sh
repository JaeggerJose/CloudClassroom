#!/bin/bash
#SBATCH --job-name=commit20221102143327209
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102143327209.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit bf8765172c99 20221102143327209:latest
docker save -o /home/minghsuan/task/commit_tar/20221102143327209.tar 20221102143327209:latest
docker rm -f bf8765172c99
