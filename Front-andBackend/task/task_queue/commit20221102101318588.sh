#!/bin/bash
#SBATCH --job-name=commit20221102101318588
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102101318588.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit daa9b0ac835a 20221102101318588:latest
docker save -o /home/minghsuan/task/commit_tar/20221102101318588.tar 20221102101318588:latest
docker rm -f daa9b0ac835a
