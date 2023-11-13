#!/bin/bash
#SBATCH --job-name=reboot20230116095707560
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20230116095707560.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker restart water_20230116095228147_20230116095707560
