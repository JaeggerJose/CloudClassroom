#!/bin/bash
#SBATCH --job-name=delete20221111110048614
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221111110048614.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f c5459b637f9d
