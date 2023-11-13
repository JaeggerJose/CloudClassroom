#!/bin/bash
#SBATCH --job-name=delete20230117113559774
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230117113559774.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_20230117094527516_20230117113559774
