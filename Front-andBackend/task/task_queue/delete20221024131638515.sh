#!/bin/bash
#SBATCH --job-name=delete20221024131638515
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221024131638515.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f d8dc21a5a3f8
