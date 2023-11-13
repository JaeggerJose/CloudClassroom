#!/bin/bash
#SBATCH --job-name=delete20221027103459932
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221027103459932.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f e3a9977427ec
