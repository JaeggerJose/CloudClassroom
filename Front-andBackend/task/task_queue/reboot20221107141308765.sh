#!/bin/bash
#SBATCH --job-name=reboot20221107141308765
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221107141308765.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop f7479bdd67a6
docker start f7479bdd67a6
