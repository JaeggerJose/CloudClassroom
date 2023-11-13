#!/bin/bash
#SBATCH --job-name=commit20221101095651135
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221101095651135.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit f92c736c7aa5 20221101095651135:latest
docker save -o /home/minghsuan/task/commit_tar/20221101095651135.tar 20221101095651135:latest
docker rm -f f92c736c7aa5
