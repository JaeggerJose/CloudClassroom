#!/bin/bash
#SBATCH --job-name=commit20221102082730988
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102082730988.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit  20221102082730988:latest
docker save -o /home/minghsuan/task/commit_tar/20221102082730988.tar 20221102082730988:latest
docker rm -f 
