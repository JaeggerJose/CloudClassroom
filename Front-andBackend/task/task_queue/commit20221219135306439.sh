#!/bin/bash
#SBATCH --job-name=commit20221219135306439
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221219135306439.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p d59962305a6c 20221219135306439:latest
docker save -o /home/minghsuan/task/commit_tar/20221219135306439.tar 20221219135306439:latest
docker rm -f d59962305a6c
