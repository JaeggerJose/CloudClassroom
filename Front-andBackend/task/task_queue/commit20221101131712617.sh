#!/bin/bash
#SBATCH --job-name=commit20221101131712617
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221101131712617.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 2a28640b0bb3 20221101131712617:latest
docker save -o /home/minghsuan/task/commit_tar/20221101131712617.tar 20221101131712617:latest
docker rm -f 2a28640b0bb3
