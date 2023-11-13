#!/bin/bash
#SBATCH --job-name=commit20221103170257837
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221103170257837.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 38508cb0cf57 20221103170257837:latest
docker save -o /home/minghsuan/task/commit_tar/20221103170257837.tar 20221103170257837:latest
docker rm -f 38508cb0cf57
