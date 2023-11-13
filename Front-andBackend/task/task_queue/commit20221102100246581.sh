#!/bin/bash
#SBATCH --job-name=commit20221102100246581
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102100246581.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 4fb78dc78905 20221102100246581:latest
docker save -o /home/minghsuan/task/commit_tar/20221102100246581.tar 20221102100246581:latest
docker rm -f 4fb78dc78905
