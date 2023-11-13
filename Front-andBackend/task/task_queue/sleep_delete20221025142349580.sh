#!/bin/bash
#SBATCH --job-name=sleep_delete20221025142349580
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20221025142349580.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20221025142349580:latest
rm /home/minghsuan/task/commit_tar/20221025142349580.tar
