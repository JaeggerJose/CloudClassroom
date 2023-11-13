#!/bin/bash
#SBATCH --job-name=commit20221107100908181
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107100908181.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p a960f0e0370e 20221107100908181:latest
docker save -o /home/minghsuan/task/commit_tar/20221107100908181.tar 20221107100908181:latest
docker rm -f a960f0e0370e
