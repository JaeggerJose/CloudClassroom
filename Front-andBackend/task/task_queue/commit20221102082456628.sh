#!/bin/bash
#SBATCH --job-name=commit20221102082456628
#SBATCH --output=/home/minghsuan/task/task_finished/output_commit20221102082456628.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker commit fe90cf282c70 20221102082456628:latest
docker save -o /home/minghsuan/task/commit_tar/20221102082456628.tar 20221102082456628:latest
docker rm -f fe90cf282c70
