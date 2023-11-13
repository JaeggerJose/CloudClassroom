#!/bin/bash
#SBATCH --job-name=reboot20221205140411901
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221205140411901.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop db320f1d30cf
docker start db320f1d30cf
