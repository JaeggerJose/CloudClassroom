#!/bin/bash
#SBATCH --job-name=commit20221201110108465
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221201110108465.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 996d92a4f646 20221201110108465:latest
docker save -o /home/minghsuan/task/commit_tar/20221201110108465.tar 20221201110108465:latest
docker rm -f 996d92a4f646
