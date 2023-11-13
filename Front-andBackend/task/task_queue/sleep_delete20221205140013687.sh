#!/bin/bash
#SBATCH --job-name=sleep_delete20221205140013687
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20221205140013687.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20221205140013687:latest
rm /home/minghsuan/task/commit_tar/20221205140013687.tar
