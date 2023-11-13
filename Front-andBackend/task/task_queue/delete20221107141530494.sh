#!/bin/bash
#SBATCH --job-name=delete20221107141530494
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107141530494.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f bd216b7b5a5f
