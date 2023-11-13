#!/bin/bash
#SBATCH --job-name=commit20221021160059319
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221021160059319.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit bd1b0dca4999 20221021160059319:latest
docker save -o /home/minghsuan/task/commit_tar/20221021160059319.tar 20221021160059319:latest
