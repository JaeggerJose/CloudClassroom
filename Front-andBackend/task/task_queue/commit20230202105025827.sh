#!/bin/bash
#SBATCH --job-name=commit20230202105025827
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230202105025827.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p water_webtop_orange3_CLC_20230202105025827 20230202105025827:latest
docker save -o /home/minghsuan/task/commit_tar/20230202105025827.tar 20230202105025827:latest
docker rm -f water_webtop_orange3_CLC_20230202105025827
