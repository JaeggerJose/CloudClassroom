#!/bin/bash
#SBATCH --job-name=delete20221107090637789
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107090637789.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f ca8e558b5d41
