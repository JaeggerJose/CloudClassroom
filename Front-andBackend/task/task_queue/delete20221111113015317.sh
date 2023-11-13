#!/bin/bash
#SBATCH --job-name=delete20221111113015317
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221111113015317.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 33cad0739cc7
