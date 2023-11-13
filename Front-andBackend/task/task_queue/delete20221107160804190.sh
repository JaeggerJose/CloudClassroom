#!/bin/bash
#SBATCH --job-name=delete20221107160804190
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107160804190.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f b7e2ab08fd1d
