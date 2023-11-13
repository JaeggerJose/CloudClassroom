#!/bin/bash
#SBATCH --job-name=job_status
#SBATCH --output=/home/ccllab/task/task_finished/output_job_status.log
#SBATCH --partition=COMPUTE1Q
#SBATCH --account=root
docker ps -a --format "{{.Status}}	{{.Names}}"
