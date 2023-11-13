#!/bin/bash
#SBATCH --job-name=reboot20221025102329146
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221025102329146.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop c1f30813c607
docker start c1f30813c607
docker ps --filter "id=c1f30813c607" --format "{{.Status}}"
