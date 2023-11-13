#!/bin/bash
#SBATCH --job-name=reboot20221013124959450
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output20221013124959450.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop f1da52284780
docker start f1da52284780
