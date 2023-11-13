#!/bin/bash
#SBATCH --job-name=commit20221115143530896
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221115143530896.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p e0a183ae2c13 20221115143530896:latest
docker save -o /home/minghsuan/task/commit_tar/20221115143530896.tar 20221115143530896:latest
docker rm -f e0a183ae2c13
