#!/bin/bash
#SBATCH --job-name=delete20221221132311241
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221221132311241.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f bc15f8079faa
