#!/bin/bash
#SBATCH --job-name=delete20221103115433797
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221103115433797.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 34f6de2821c8
