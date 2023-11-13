#!/bin/bash
#SBATCH --job-name=reboot20221221132311241
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221221132311241.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop bc15f8079faa
docker start bc15f8079faa
