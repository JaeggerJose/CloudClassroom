#!/bin/bash
#SBATCH --job-name=sleep_delete20221101143014617
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20221101143014617.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20221101143014617:latest
rm /home/minghsuan/task/commit_tar/20221101143014617.tar
