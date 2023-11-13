#!/bin/bash
#SBATCH --job-name=delete20221107095805275
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107095805275.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 69d8744e843a
