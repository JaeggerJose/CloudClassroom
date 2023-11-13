#!/bin/bash
#SBATCH --job-name=delete20221202093340135
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221202093340135.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 6eda9a4f8fe4
