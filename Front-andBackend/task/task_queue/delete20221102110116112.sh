#!/bin/bash
#SBATCH --job-name=delete20221102110116112
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221102110116112.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f a8dc67add4c2
