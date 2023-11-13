#!/bin/bash
#SBATCH --job-name=delete20221109144425109
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221109144425109.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f d2b01f5cc562
