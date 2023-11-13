#!/bin/bash
#SBATCH --job-name=delete20221102153916672
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221102153916672.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 4bc6354676f3
