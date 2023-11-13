#!/bin/bash
#SBATCH --job-name=commit20221022081648845
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221022081648845.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 701a1ce22b3a 20221022081648845:latest
docker save -o /home/minghsuan/task/commit_tar/20221022081648845.tar 20221022081648845:latest
docker rm -f 701a1ce22b3a
