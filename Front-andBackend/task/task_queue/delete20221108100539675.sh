#!/bin/bash
#SBATCH --job-name=delete20221108100539675
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108100539675.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f c94a0ec5ab55
