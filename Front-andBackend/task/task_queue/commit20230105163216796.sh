#!/bin/bash
#SBATCH --job-name=commit20230105163216796
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230105163216796.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p root_20230105155532112_20230105163216796 20230105163216796:latest
docker save -o /home/minghsuan/task/commit_tar/20230105163216796.tar 20230105163216796:latest
docker rm -f root_20230105155532112_20230105163216796
