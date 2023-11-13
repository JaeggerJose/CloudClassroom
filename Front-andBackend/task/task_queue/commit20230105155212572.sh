#!/bin/bash
#SBATCH --job-name=commit20230105155212572
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230105155212572.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p root_20230105154340531_20230105155212572 20230105155212572:latest
docker save -o /home/minghsuan/task/commit_tar/20230105155212572.tar 20230105155212572:latest
docker rm -f root_20230105154340531_20230105155212572
