#!/bin/bash
#SBATCH --job-name=sleep_delete20221102101318588
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20221102101318588.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20221102101318588:latest
rm /home/minghsuan/task/commit_tar/20221102101318588.tar
