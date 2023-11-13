#!/bin/bash
#SBATCH --job-name=delete20221107155900843
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107155900843.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 3aa6aa0a6623
