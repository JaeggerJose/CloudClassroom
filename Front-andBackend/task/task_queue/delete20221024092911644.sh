#!/bin/bash
#SBATCH --job-name=delete20221024092911644
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221024092911644.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f d4b5d7fb8183
