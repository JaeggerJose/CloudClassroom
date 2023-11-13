#!/bin/bash
#SBATCH --job-name=commit20230105155532112
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230105155532112.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p root_20230105155212572_20230105155532112 20230105155532112:latest
docker save -o /home/minghsuan/task/commit_tar/20230105155532112.tar 20230105155532112:latest
docker rm -f root_20230105155212572_20230105155532112
