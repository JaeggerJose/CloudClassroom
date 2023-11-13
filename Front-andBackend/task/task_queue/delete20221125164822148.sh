#!/bin/bash
#SBATCH --job-name=delete20221125164822148
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221125164822148.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f ac5716121c3a
