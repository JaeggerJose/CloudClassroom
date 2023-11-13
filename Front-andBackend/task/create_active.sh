#!/bin/bash
mv /home/ccllab/Desktop/Job_queue/job$1.sh /home/ccllab/Desktop/Job_finished
jobid=$(sbatch --parsable /home/ccllab/Desktop/Job_finished/job$1.sh)
echo $jobid
