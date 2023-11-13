#!/bin/bash
#SBATCH --job-name=commit20221102143418281
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102143418281.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 062ca1c713d1 20221102143418281:latest
docker save -o /home/minghsuan/task/commit_tar/20221102143418281.tar 20221102143418281:latest
docker rm -f 062ca1c713d1
