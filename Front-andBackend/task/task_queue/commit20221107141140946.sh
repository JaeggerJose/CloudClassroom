#!/bin/bash
#SBATCH --job-name=commit20221107141140946
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107141140946.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p cee191968669 20221107141140946:latest
docker save -o /home/minghsuan/task/commit_tar/20221107141140946.tar 20221107141140946:latest
docker rm -f cee191968669
