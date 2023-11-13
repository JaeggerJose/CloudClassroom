#!/bin/bash
#SBATCH --job-name=commit20230113092845218
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20230113092845218.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p water_20221222141757941_20230113092845218 20230113092845218:latest
docker save -o /home/minghsuan/task/commit_tar/20230113092845218.tar 20230113092845218:latest
docker rm -f water_20221222141757941_20230113092845218
