#!/bin/bash
#SBATCH --job-name=commit20221102084835683
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102084835683.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p c4d25ec9a650 20221102084835683:latest
docker save -o /home/minghsuan/task/commit_tar/20221102084835683.tar 20221102084835683:latest
docker rm -f c4d25ec9a650
