#!/bin/bash
#SBATCH --job-name=commit20221028134844581
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221028134844581.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit f0474b683136 20221028134844581:latest
docker save -o /home/minghsuan/task/commit_tar/20221028134844581.tar 20221028134844581:latest
docker rm -f f0474b683136
