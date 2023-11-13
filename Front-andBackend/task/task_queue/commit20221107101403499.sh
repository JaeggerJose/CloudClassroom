#!/bin/bash
#SBATCH --job-name=commit20221107101403499
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107101403499.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p c4879454f4f2 20221107101403499:latest
docker save -o /home/minghsuan/task/commit_tar/20221107101403499.tar 20221107101403499:latest
docker rm -f c4879454f4f2
