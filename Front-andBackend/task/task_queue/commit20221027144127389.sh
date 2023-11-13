#!/bin/bash
#SBATCH --job-name=commit20221027144127389
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221027144127389.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 8f97edbc8283 20221027144127389:latest
docker save -o /home/minghsuan/task/commit_tar/20221027144127389.tar 20221027144127389:latest
docker rm -f 8f97edbc8283
