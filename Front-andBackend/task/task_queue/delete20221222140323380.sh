#!/bin/bash
#SBATCH --job-name=delete20221222140323380
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=2022-12-23T00:00:00
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221222140323380.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_webtop_matlab_20221222140323380
