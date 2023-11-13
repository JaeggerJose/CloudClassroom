#!/bin/bash
#SBATCH --job-name=reboot20221101143014617
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221101143014617.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop fbabfc3e3eab
docker start fbabfc3e3eab
