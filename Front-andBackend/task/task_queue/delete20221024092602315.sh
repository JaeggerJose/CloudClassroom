#!/bin/bash
#SBATCH --job-name=delete20221024092602315
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221024092602315.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f ffe08e06fb4a
