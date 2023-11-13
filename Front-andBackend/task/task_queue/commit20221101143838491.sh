#!/bin/bash
#SBATCH --job-name=commit20221101143838491
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221101143838491.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit e781505ef0a9 20221101143838491:latest
docker save -o /home/minghsuan/task/commit_tar/20221101143838491.tar 20221101143838491:latest
docker rm -f e781505ef0a9
