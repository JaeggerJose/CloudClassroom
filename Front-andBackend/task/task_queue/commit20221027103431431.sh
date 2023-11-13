#!/bin/bash
#SBATCH --job-name=commit20221027103431431
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221027103431431.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 175dd5d8fed3 20221027103431431:latest
docker save -o /home/minghsuan/task/commit_tar/20221027103431431.tar 20221027103431431:latest
docker rm -f 175dd5d8fed3
