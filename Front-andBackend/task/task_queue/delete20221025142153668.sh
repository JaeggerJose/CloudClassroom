#!/bin/bash
#SBATCH --job-name=delete20221025142153668
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221025142153668.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 00b3302b971c
