#!/bin/bash
#SBATCH --job-name=delete20230103164639787
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230103164639787.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f water_webtop_itksnap_mitkworkbench_3dslicer_20230103164639787
