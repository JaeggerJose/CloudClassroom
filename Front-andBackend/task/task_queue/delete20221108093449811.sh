#!/bin/bash
#SBATCH --job-name=delete20221108093449811
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108093449811.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 2dda2b3a88d9
