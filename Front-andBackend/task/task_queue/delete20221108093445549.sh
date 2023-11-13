#!/bin/bash
#SBATCH --job-name=delete20221108093445549
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108093445549.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 460b52d4a680
