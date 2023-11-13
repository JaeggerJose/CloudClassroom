#!/bin/bash
#SBATCH --job-name=delete20221205163053706
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221205163053706.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 934b2b1de31e
