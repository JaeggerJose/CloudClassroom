#!/bin/bash
#SBATCH --job-name=delete20221107143236501
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107143236501.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 59203882350f
