#!/bin/bash
#SBATCH --job-name=delete20221222152512600
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=2022-12-22T15:27:00
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221222152512600.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_webtop_matlab_20221222152512600
