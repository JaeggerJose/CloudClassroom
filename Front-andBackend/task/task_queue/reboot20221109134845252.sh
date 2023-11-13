#!/bin/bash
#SBATCH --job-name=reboot20221109134845252
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221109134845252.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 385b059c0763
docker start 385b059c0763
