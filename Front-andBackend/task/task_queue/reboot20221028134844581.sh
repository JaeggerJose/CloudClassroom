#!/bin/bash
#SBATCH --job-name=reboot20221028134844581
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221028134844581.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop f0474b683136
docker start f0474b683136
