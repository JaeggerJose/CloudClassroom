#!/bin/bash
#SBATCH --job-name=delete20221208151207927
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221208151207927.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f testuser_webtop_matlab_20221208151207927
