#!/bin/bash
#SBATCH --job-name=reboot20230106130053355
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20230106130053355.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker restart water_jupyter_notebook_20230106130053355
