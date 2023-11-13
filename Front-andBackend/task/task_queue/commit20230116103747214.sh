#!/bin/bash
#SBATCH --job-name=commit20230116103747214
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230116103747214.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p water_webtop_matlab_20230116103747214 20230116103747214:latest
docker save -o /home/minghsuan/task/commit_tar/20230116103747214.tar 20230116103747214:latest
docker rm -f water_webtop_matlab_20230116103747214
