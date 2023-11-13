#!/bin/bash
#SBATCH --job-name=delete20220906120618918
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20220906120618918.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 850e9c7474d8
