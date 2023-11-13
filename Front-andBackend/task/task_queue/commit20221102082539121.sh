#!/bin/bash
#SBATCH --job-name=commit20221102082539121
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102082539121.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit  20221102082539121:latest
docker save -o /home/minghsuan/task/commit_tar/20221102082539121.tar 20221102082539121:latest
docker rm -f 
