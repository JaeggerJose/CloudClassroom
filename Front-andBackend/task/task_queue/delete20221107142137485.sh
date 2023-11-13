#!/bin/bash
#SBATCH --job-name=delete20221107142137485
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107142137485.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 88aeeaac1d84
