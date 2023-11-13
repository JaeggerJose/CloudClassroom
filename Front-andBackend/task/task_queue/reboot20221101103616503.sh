#!/bin/bash
#SBATCH --job-name=reboot20221101103616503
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221101103616503.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop df01946b51c2
docker start df01946b51c2
