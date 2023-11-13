#!/bin/bash
#SBATCH --job-name=delete20221108093453903
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108093453903.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 4b8faf779e2b
