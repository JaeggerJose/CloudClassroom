#!/bin/bash
#SBATCH --job-name=delete20221202152954224
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221202152954224.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f ff3c6d4a8990
