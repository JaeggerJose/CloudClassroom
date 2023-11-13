#!/bin/bash
#SBATCH --job-name=commit20230116110306457
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230116110306457.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p water_jupyter_notebook_20230116110306457 20230116110306457:latest
docker save -o /home/minghsuan/task/commit_tar/20230116110306457.tar 20230116110306457:latest
docker rm -f water_jupyter_notebook_20230116110306457
