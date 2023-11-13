#!/bin/bash
#SBATCH --job-name=commit20221107161914447
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107161914447.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 4858b9cc4e9f 20221107161914447:latest
docker save -o /home/minghsuan/task/commit_tar/20221107161914447.tar 20221107161914447:latest
docker rm -f 4858b9cc4e9f
