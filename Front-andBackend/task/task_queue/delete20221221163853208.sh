#!/bin/bash
#SBATCH --job-name=delete20221221163853208
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221221163853208.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_webtop_matlab_20221221163853208
