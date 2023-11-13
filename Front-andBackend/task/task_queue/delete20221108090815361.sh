#!/bin/bash
#SBATCH --job-name=delete20221108090815361
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108090815361.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f a09f5cbfdcab
