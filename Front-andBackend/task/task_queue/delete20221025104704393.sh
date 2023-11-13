#!/bin/bash
#SBATCH --job-name=delete20221025104704393
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221025104704393.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f d2d44a44323c
