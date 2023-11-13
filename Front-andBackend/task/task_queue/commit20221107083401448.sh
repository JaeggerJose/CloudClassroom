#!/bin/bash
#SBATCH --job-name=commit20221107083401448
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221107083401448.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit c6f6c81d1b70 20221107083401448:latest
docker save -o /home/minghsuan/task/commit_tar/20221107083401448.tar 20221107083401448:latest
docker rm -f c6f6c81d1b70
