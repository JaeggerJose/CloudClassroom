#!/bin/bash
#SBATCH --job-name=reboot20221017114929287
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/outpu_reboot20221017114929287.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 4804fdad2586
docker start 4804fdad2586
