#!/bin/bash
#SBATCH --job-name=commit20221017114929287
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221017114929287.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 4804fdad2586 20221017114929287:latest
docker save -o /home/minghsuan/task/commit_tar/20221017114929287.tar 20221017114929287:latest
