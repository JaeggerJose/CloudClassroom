#!/bin/bash
#SBATCH --job-name=sleep_delete20221107100908181
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20221107100908181.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20221107100908181:latest
rm /home/minghsuan/task/commit_tar/20221107100908181.tar
