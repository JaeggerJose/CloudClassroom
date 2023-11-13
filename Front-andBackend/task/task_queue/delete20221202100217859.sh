#!/bin/bash
#SBATCH --job-name=delete20221202100217859
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221202100217859.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f ba0767ca1c18
