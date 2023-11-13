#!/bin/bash
#SBATCH --job-name=delete20221229154915320
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221229154915320.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_20221222141757941_20221229154915320
