#!/bin/bash
#SBATCH --job-name=delete20230720163727868
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/ccllab/task/task_finished/output_delete20230720163727868.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f ccllab_minghsuan_webtop_itksnap_20230720163727868
