#!/bin/bash
#SBATCH --job-name=sleep_delete20221103170257837
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20221103170257837.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20221103170257837:latest
rm /home/minghsuan/task/commit_tar/20221103170257837.tar
