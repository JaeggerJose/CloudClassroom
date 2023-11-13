#!/bin/bash
#SBATCH --job-name=commit20221102084858395
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102084858395.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 37393ec4d130 20221102084858395:latest
docker save -o /home/minghsuan/task/commit_tar/20221102084858395.tar 20221102084858395:latest
docker rm -f 37393ec4d130
