#!/bin/bash
#SBATCH --job-name=delete20221202100218654
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221202100218654.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f e79777a04373
