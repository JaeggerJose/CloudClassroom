#!/bin/bash
#SBATCH --job-name=delete20230116095707560
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230116095707560.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_20230116095228147_20230116095707560
