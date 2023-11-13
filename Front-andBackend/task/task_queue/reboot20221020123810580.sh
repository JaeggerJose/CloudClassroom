#!/bin/bash
#SBATCH --job-name=reboot20221020123810580
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/outpu_reboot20221020123810580.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop d6551c2caf80
docker start d6551c2caf80
