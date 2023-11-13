#!/bin/bash
#SBATCH --job-name=commit20221102143304877
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102143304877.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 9a7b71675780 20221102143304877:latest
docker save -o /home/minghsuan/task/commit_tar/20221102143304877.tar 20221102143304877:latest
docker rm -f 9a7b71675780
