#!/bin/bash
#SBATCH --job-name=delete20221222165327185
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=2022-12-22T16:55:00
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221222165327185.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_webtop_matlab_20221222165327185
