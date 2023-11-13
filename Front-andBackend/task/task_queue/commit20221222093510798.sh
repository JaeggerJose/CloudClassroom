#!/bin/bash
#SBATCH --job-name=commit20221222093510798
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221222093510798.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p water_webtop_matlab_20221222093510798 20221222093510798:latest
docker save -o /home/minghsuan/task/commit_tar/20221222093510798.tar 20221222093510798:latest
docker rm -f water_webtop_matlab_20221222093510798
