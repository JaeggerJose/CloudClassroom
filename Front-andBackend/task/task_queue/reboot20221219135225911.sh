#!/bin/bash
#SBATCH --job-name=reboot20221219135225911
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221219135225911.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker restart 4ee60b179e29
