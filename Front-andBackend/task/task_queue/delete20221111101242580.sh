#!/bin/bash
#SBATCH --job-name=delete20221111101242580
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221111101242580.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f e1e84795f0ac
