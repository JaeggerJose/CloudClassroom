#!/bin/bash
#SBATCH --job-name=reboot20221003185711394
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output20221003185711394.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 7bb45227bc36
docker start 7bb45227bc36
