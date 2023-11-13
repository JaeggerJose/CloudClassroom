#!/bin/bash
#SBATCH --job-name=delete20230116104126954
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230116104126954.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_20230116103747214_20230116104126954
