#!/bin/bash
#SBATCH --job-name=commit20221125164822582
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221125164822582.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit -p 5e66ab76659b 20221125164822582:latest
docker save -o /home/minghsuan/task/commit_tar/20221125164822582.tar 20221125164822582:latest
docker rm -f 5e66ab76659b
