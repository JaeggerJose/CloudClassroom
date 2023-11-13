#!/bin/bash
#SBATCH --job-name=commit20221102091249501
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102091249501.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 27c40d56030d 20221102091249501:latest
docker save -o /home/minghsuan/task/commit_tar/20221102091249501.tar 20221102091249501:latest
docker rm -f 27c40d56030d
