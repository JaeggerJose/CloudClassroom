#!/bin/bash
#SBATCH --job-name=commit20230116095228147
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230116095228147.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p water_webtop_matlab_20230116095228147 20230116095228147:latest
docker save -o /home/minghsuan/task/commit_tar/20230116095228147.tar 20230116095228147:latest
docker rm -f water_webtop_matlab_20230116095228147
