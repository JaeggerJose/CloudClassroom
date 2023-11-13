#!/bin/bash
#SBATCH --job-name=delete20221013103102241
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221013103102241.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 22607fbb4c0f
