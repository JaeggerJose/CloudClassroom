#!/bin/bash
#SBATCH --job-name=reboot20221108100535613
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221108100535613.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 6936b7d2c567
docker start 6936b7d2c567
