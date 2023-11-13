#!/bin/bash
#SBATCH --job-name=delete20221107081721201
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107081721201.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 383c301c19fe
