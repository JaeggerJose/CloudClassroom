#!/bin/bash
#SBATCH --job-name=delete20230110144222152
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230110144222152.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_webtop_matlab_20230110144222152
