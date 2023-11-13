#!/bin/bash
#SBATCH --job-name=delete20221107100747770
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107100747770.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 81eb80b853c9
