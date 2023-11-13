#!/bin/bash
#SBATCH --job-name=reboot20221027103459932
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221027103459932.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop e3a9977427ec
docker start e3a9977427ec
