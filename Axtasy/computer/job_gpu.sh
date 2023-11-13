#!/bin/bash
#SBATCH --output=test.out
#SBATCH --error=test.err
#SBATCH --gres=gpu:1

set -x
singularity exec --nv ~/singularity_test/singularity_test_torch.sif python ~/singularity_test/gpu_test.py