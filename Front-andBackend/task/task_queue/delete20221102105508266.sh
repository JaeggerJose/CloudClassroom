#!/bin/bash
#SBATCH --job-name=delete20221102105508266
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221102105508266.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f b533dd272218
