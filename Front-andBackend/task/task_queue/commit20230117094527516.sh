#!/bin/bash
#SBATCH --job-name=commit20230117094527516
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230117094527516.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p water_jupyter_notebook_20230117094527516 20230117094527516:latest
docker save -o /home/minghsuan/task/commit_tar/20230117094527516.tar 20230117094527516:latest
docker rm -f water_jupyter_notebook_20230117094527516
