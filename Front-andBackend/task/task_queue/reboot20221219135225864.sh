#!/bin/bash
#SBATCH --job-name=reboot20221219135225864
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221219135225864.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker restart water_webtop_matlab_20221219135225864
