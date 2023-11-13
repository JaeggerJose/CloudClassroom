#!/bin/bash
#SBATCH --job-name=delete20221102145540823
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221102145540823.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f a21c00d52114
