#!/bin/bash
#SBATCH --job-name=delete20221013125331261
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221013125331261.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f abb910fc3745
