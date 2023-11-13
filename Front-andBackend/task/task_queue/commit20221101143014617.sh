#!/bin/bash
#SBATCH --job-name=commit20221101143014617
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221101143014617.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit fbabfc3e3eab 20221101143014617:latest
docker save -o /home/minghsuan/task/commit_tar/20221101143014617.tar 20221101143014617:latest
docker rm -f fbabfc3e3eab
