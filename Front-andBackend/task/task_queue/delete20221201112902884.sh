#!/bin/bash
#SBATCH --job-name=delete20221201112902884
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221201112902884.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f e539fce597b4
