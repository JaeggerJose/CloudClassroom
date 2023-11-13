#!/bin/bash
#SBATCH --job-name=delete20221103100805975
#SBATCH --output=/home/minghsuan/task/task_finished/output_delete20221103100805975.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker rm -f 7541cd92057f
