#!/bin/bash
#SBATCH --job-name=commit20221102082517204
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102082517204.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 7ff9e5aff620 20221102082517204:latest
docker save -o /home/minghsuan/task/commit_tar/20221102082517204.tar 20221102082517204:latest
docker rm -f 7ff9e5aff620
