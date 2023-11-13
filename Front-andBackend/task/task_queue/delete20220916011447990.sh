#!/bin/bash
#SBATCH --job-name=delete20220916011447990
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20220916011447990.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f cea31d7dc9b7
