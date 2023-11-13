#!/bin/bash
#SBATCH --job-name=sleep_delete20221107083401448
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20221107083401448.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20221107083401448:latest
rm /home/minghsuan/task/commit_tar/20221107083401448.tar
