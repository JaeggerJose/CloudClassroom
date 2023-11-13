#!/bin/bash
#SBATCH --job-name=commit20221102143359492
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102143359492.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit b08e7913f982 20221102143359492:latest
docker save -o /home/minghsuan/task/commit_tar/20221102143359492.tar 20221102143359492:latest
docker rm -f b08e7913f982
