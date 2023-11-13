#!/bin/bash
#SBATCH --job-name=commit20230105154340531
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230105154340531.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p root_webtop_itksnap_20230105154340531 20230105154340531:latest
docker save -o /home/minghsuan/task/commit_tar/20230105154340531.tar 20230105154340531:latest
docker rm -f root_webtop_itksnap_20230105154340531
