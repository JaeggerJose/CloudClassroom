#!/bin/bash
#SBATCH --job-name=reboot20221024131815392
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1gb
#SBATCH --output=/home/minghsuan/task/task_finished/output_reboot20221024131815392.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker stop 3387c5fa924d
docker start 3387c5fa924d
