#!/bin/bash
#SBATCH --job-name=delete20230106150224432
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=2023-01-06T17:02:00
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230106150224432.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_jupyter_notebook_20230106150224432
