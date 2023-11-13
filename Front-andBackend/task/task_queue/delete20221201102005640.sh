#!/bin/bash
#SBATCH --job-name=delete20221201102005640
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221201102005640.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 3aff31b65871
