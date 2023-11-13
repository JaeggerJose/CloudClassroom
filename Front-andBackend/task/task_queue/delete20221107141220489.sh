#!/bin/bash
#SBATCH --job-name=delete20221107141220489
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107141220489.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f acf151b742f0
