#!/bin/bash
#SBATCH --job-name=delete20221108085842614
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108085842614.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 07f4d54e203f
