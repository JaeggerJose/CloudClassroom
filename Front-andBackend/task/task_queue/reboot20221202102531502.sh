#!/bin/bash
#SBATCH --job-name=reboot20221202102531502
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221202102531502.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 2f57e757d078
docker start 2f57e757d078
