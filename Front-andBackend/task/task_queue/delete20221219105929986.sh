#!/bin/bash
#SBATCH --job-name=delete20221219105929986
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221219105929986.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 0c1904016698
