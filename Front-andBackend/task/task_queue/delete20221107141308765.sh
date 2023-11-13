#!/bin/bash
#SBATCH --job-name=delete20221107141308765
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107141308765.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f f7479bdd67a6
