#!/bin/bash
#SBATCH --job-name=delete20230719183332306
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/task/task_finished/output_delete20230719183332306.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f minghsuan_webtop_3dslicer_20230719183332306
