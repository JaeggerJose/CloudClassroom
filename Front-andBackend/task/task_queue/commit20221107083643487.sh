#!/bin/bash
#SBATCH --job-name=commit20221107083643487
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107083643487.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 8b9685ef8b2e 20221107083643487:latest
docker save -o /home/minghsuan/task/commit_tar/20221107083643487.tar 20221107083643487:latest
docker rm -f 8b9685ef8b2e
