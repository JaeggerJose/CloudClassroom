#!/bin/bash
#SBATCH --job-name=delete20220916011150367
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20220916011150367.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 1d2390b48e2a
