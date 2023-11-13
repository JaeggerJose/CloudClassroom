#!/bin/bash
#SBATCH --job-name=reboot20221027114053367
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221027114053367.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 3644afe1dff8
docker start 3644afe1dff8
