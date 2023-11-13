#!/bin/bash
#SBATCH --job-name=reboot20221025104704393
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221025104704393.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop d2d44a44323c
docker start d2d44a44323c
