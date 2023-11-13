#!/bin/bash
#SBATCH --job-name=delete20221024083914971
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221024083914971.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f aef63e0f4e18
