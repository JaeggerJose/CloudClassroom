#!/bin/bash
#SBATCH --job-name=reboot20221110150958175
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221110150958175.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop b5b4bc15ee60
docker start b5b4bc15ee60
