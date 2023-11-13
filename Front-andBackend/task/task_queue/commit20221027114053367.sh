#!/bin/bash
#SBATCH --job-name=commit20221027114053367
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221027114053367.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 3644afe1dff8 20221027114053367:latest
docker save -o /home/minghsuan/task/commit_tar/20221027114053367.tar 20221027114053367:latest
docker rm -f 3644afe1dff8
