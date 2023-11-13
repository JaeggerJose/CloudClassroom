#!/bin/bash
#SBATCH --job-name=delete20221109134841413
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221109134841413.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 03a70f301af1
