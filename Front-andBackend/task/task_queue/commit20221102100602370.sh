#!/bin/bash
#SBATCH --job-name=commit20221102100602370
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102100602370.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 1280c6ceb183 20221102100602370:latest
docker save -o /home/minghsuan/task/commit_tar/20221102100602370.tar 20221102100602370:latest
docker rm -f 1280c6ceb183
