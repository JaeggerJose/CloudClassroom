#!/bin/bash
#SBATCH --job-name=commit20221107095613606
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107095613606.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p bde6ef07c21e 20221107095613606:latest
docker save -o /home/minghsuan/task/commit_tar/20221107095613606.tar 20221107095613606:latest
docker rm -f bde6ef07c21e
