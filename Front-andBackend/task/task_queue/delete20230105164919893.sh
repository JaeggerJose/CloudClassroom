#!/bin/bash
#SBATCH --job-name=delete20230105164919893
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230105164919893.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f root_20230105163216796_20230105164919893
