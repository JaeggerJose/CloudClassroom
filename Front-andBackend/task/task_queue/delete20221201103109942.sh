#!/bin/bash
#SBATCH --job-name=delete20221201103109942
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221201103109942.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 674cdea2ba61
