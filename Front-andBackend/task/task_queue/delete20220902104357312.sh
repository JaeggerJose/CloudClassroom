#!/bin/bash
#SBATCH --job-name=delete20220902104357312
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20220902104357312.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 9f0d78a91b33
