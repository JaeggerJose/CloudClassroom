#!/bin/bash
#SBATCH --job-name=delete20221019123730922
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221019123730922.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 56febf64b36b
