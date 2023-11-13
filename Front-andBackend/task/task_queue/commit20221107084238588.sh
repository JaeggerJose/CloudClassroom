#!/bin/bash
#SBATCH --job-name=commit20221107084238588
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107084238588.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit b6ab59aeccab 20221107084238588:latest
docker save -o /home/minghsuan/task/commit_tar/20221107084238588.tar 20221107084238588:latest
docker rm -f b6ab59aeccab
