#!/bin/bash
#SBATCH --job-name=reboot20221018160437728
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output20221018160437728.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 3084be9f0a93
docker rm -f 3084be9f0a93
