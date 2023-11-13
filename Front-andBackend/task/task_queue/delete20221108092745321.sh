#!/bin/bash
#SBATCH --job-name=delete20221108092745321
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221108092745321.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f ea015ce9a182
