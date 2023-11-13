#!/bin/bash
#SBATCH --job-name=delete20221102153847953
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221102153847953.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 9d23f36e95b5
