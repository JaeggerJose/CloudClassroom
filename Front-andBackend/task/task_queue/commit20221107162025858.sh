#!/bin/bash
#SBATCH --job-name=commit20221107162025858
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107162025858.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 32a8f8465696 20221107162025858:latest
docker save -o /home/minghsuan/task/commit_tar/20221107162025858.tar 20221107162025858:latest
docker rm -f 32a8f8465696
