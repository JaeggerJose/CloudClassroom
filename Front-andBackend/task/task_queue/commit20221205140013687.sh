#!/bin/bash
#SBATCH --job-name=commit20221205140013687
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221205140013687.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 8d61c7163a2c 20221205140013687:latest
docker save -o /home/minghsuan/task/commit_tar/20221205140013687.tar 20221205140013687:latest
docker rm -f 8d61c7163a2c
