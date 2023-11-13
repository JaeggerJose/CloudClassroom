#!/bin/bash
#SBATCH --job-name=commit20221102105736176
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102105736176.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 99be4539fa38 20221102105736176:latest
docker save -o /home/minghsuan/task/commit_tar/20221102105736176.tar 20221102105736176:latest
docker rm -f 99be4539fa38
