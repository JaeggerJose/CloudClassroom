#!/bin/bash
#SBATCH --job-name=delete20221130164021850
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221130164021850.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f f148ed04fd54
