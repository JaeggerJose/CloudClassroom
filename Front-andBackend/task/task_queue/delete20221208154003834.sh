#!/bin/bash
#SBATCH --job-name=delete20221208154003834
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221208154003834.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 82fb4cdf5f5b
