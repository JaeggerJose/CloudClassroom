#!/bin/bash
#SBATCH --job-name=commit20221107140948521
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107140948521.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 327c8af7943e 20221107140948521:latest
docker save -o /home/minghsuan/task/commit_tar/20221107140948521.tar 20221107140948521:latest
docker rm -f 327c8af7943e
