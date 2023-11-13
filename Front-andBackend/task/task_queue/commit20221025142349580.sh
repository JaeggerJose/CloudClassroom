#!/bin/bash
#SBATCH --job-name=commit20221025142349580
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221025142349580.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit 65edd70da788 20221025142349580:latest
docker save -o /home/minghsuan/task/commit_tar/20221025142349580.tar 20221025142349580:latest
docker rm -f 65edd70da788
