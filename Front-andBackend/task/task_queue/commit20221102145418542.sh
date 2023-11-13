#!/bin/bash
#SBATCH --job-name=commit20221102145418542
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102145418542.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 024bea56940e 20221102145418542:latest
docker save -o /home/minghsuan/task/commit_tar/20221102145418542.tar 20221102145418542:latest
docker rm -f 024bea56940e
