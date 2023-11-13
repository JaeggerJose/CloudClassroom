#!/bin/bash
#SBATCH --job-name=delete20230116163052982
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=2023-01-21T00:00:00
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230116163052982.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_webtop_matlab_20230116163052982
