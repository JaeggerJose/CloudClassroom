#!/bin/bash
#SBATCH --job-name=commit20221102082411650
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102082411650.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit ad5c816f6691 20221102082411650:latest
docker save -o /home/minghsuan/task/commit_tar/20221102082411650.tar 20221102082411650:latest
docker rm -f ad5c816f6691
