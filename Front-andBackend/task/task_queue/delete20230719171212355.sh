#!/bin/bash
#SBATCH --job-name=delete20230719171212355
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/task/task_finished/output_delete20230719171212355.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f minghsuan_webtop_itksnap_20230719171212355
