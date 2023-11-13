#!/bin/bash
#SBATCH --job-name=reboot20221025142349580
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221025142349580.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 65edd70da788
docker start 65edd70da788
