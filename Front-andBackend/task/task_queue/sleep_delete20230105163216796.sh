#!/bin/bash
#SBATCH --job-name=sleep_delete20230105163216796
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_sleep_delete20230105163216796.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker image rm 20230105163216796:latest
rm /home/minghsuan/task/commit_tar/20230105163216796.tar
