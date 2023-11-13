#!/bin/bash
#SBATCH --job-name=delete20221220090743910
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221220090743910.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_20221219135306439_20221220090743910
