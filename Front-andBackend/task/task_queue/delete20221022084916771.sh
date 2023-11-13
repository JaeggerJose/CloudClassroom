#!/bin/bash
#SBATCH --job-name=delete20221022084916771
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221022084916771.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f c6fff72bdf3d
