#!/bin/bash
#SBATCH --job-name=delete20230116090300674
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230116090300674.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_20221222141757941_20230116090300674
