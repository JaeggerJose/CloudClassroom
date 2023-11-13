#!/bin/bash
#SBATCH --job-name=delete20221121095532729
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221121095532729.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 5bf7450d7cd1
