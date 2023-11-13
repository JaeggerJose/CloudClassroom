#!/bin/bash
#SBATCH --job-name=delete20221228105550314
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221228105550314.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_20221222141757941_20221228105550314
