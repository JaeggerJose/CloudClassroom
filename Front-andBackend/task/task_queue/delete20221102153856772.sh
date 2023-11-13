#!/bin/bash
#SBATCH --job-name=delete20221102153856772
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221102153856772.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 8eaab7a2b158
