#!/bin/bash
#SBATCH --job-name=commit20221102081644808
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102081644808.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 24bdfc6f23c6 20221102081644808:latest
docker save -o /home/minghsuan/task/commit_tar/20221102081644808.tar 20221102081644808:latest
docker rm -f 24bdfc6f23c6
