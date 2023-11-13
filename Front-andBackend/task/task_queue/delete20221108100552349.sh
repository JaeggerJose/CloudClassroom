#!/bin/bash
#SBATCH --job-name=delete20221108100552349
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108100552349.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 0f815350d0aa
