#!/bin/bash
#SBATCH --job-name=commit20230202110117235
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230202110117235.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p aic_webtop_itksnap_20230202110117235 20230202110117235:latest
docker save -o /home/minghsuan/task/commit_tar/20230202110117235.tar 20230202110117235:latest
docker rm -f aic_webtop_itksnap_20230202110117235
