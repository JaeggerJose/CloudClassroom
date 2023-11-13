#!/bin/bash
#SBATCH --job-name=delete20221107095354840
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221107095354840.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f c95edbf537c9
