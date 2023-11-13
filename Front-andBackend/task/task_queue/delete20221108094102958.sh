#!/bin/bash
#SBATCH --job-name=delete20221108094102958
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108094102958.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 00ee5b03425f
