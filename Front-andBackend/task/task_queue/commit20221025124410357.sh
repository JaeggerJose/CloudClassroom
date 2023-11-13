#!/bin/bash
#SBATCH --job-name=commit20221025124410357
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221025124410357.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit b76f544cea3f 20221025124410357:latest
docker save -o /home/minghsuan/task/commit_tar/20221025124410357.tar 20221025124410357:latest
docker rm -f b76f544cea3f
