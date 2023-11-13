#!/bin/bash
#SBATCH --job-name=reboot20221111124827728
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221111124827728.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 44b0deaecfd7
docker start 44b0deaecfd7
