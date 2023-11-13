#!/bin/bash
#SBATCH --job-name=commit20221107100733138
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107100733138.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 674dcc885733 20221107100733138:latest
docker save -o /home/minghsuan/task/commit_tar/20221107100733138.tar 20221107100733138:latest
docker rm -f 674dcc885733
