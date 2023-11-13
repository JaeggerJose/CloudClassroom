#!/bin/bash
#SBATCH --job-name=delete20230106031751709
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --begin=now
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20230106031751709.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f root_webtop_orange3_CLC_20230106031751709
