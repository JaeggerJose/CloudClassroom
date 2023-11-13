#!/bin/bash
#SBATCH --job-name=commit20221101145449714
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221101145449714.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit b48b7dc499f9 20221101145449714:latest
docker save -o /home/minghsuan/task/commit_tar/20221101145449714.tar 20221101145449714:latest
docker rm -f b48b7dc499f9
