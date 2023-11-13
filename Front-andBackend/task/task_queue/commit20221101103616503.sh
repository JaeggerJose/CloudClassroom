#!/bin/bash
#SBATCH --job-name=commit20221101103616503
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221101103616503.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit df01946b51c2 20221101103616503:latest
docker save -o /home/minghsuan/task/commit_tar/20221101103616503.tar 20221101103616503:latest
docker rm -f df01946b51c2
