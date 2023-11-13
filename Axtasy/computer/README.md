# Compute Node
# install munge  
`sudo apt install munge`
`service munge start`

copy `/etc/munge/munge.key` from master node

#### Happened Problem by installing munge

1. Error: Keyfile is insecure: "/etc/munge/munge.key" should be owned by UID 132

>Sol. `chown munge:munge /etc/munge/munge.key` #Changing the ownship of the file munge.key

2. Error: Keyfile is insecure: group-writable permissions without sticky bit set on "/etc"

>Sol. `chmod g-w /etc` #Changing the permissions of the folder /etc 


# install slurm 
```bash
apt-get install -y slurmd slurm-client
```

Create a file /etc/slurm-llnl/cgroup.conf:
```conf
CgroupAutomount=yes
CgroupReleaseAgentDir="/etc/slurm/cgroup"
ConstrainCores=yes
ConstrainDevices=yes
ConstrainRAMSpace=yes
```
Create a file /etc/slurm-llnl/gres.conf:
```conf
Name=gpu File=/dev/nvidia0
Name=gpu File=/dev/nvidia1
Name=gpu File=/dev/nvidia2
Name=gpu File=/dev/nvidia3
Name=gpu File=/dev/nvidia4
Name=gpu File=/dev/nvidia5
Name=gpu File=/dev/nvidia6
Name=gpu File=/dev/nvidia7
```
Copy slurm.conf to /etc/slurm-llnl from master node

Add `10.0.3.104 a100` to `/etc/hosts` for compute node to resolve master node's hostname `a100`
The master node's ip `10.0.3.104`

# Test
srun -p TEST -n8 sleep 1

# Some tutorials & Documents
* Task priority
  * [Fairshare](https://slurm.schedmd.com/fair_tree.html)
  * [Task scheduling](https://slurm.schedmd.com/priority_multifactor.html)
* [Submit script example](https://help.rc.ufl.edu/doc/Sample_SLURM_Scripts)
* Accounting
  * [Tutorial video](https://www.youtube.com/watch?v=8UfzXnzSmL4&t=5s)


# Slurm interactive configurator
To find slurm-wlm-configurator.html
````
$locate slurm|grep html
/usr/share/doc/slurmctld/slurm-wlm-configurator.easy.html
/usr/share/doc/slurmctld/slurm-wlm-configurator.html
````
````
$cd /usr/share/doc/slurmctld/
$python3 -m "http.server"
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
````
use browser to open the adress:port and click slurm-wlm-configurator.html to edit the configuration of Slurm.
Edit the following content
- Control Machines
  - SlurmctldHost
- Compute Machines
  - NodeName
  - NodeAddr
  - ParitionName
- Job Accounting Gather
  - JobAcctGatherType
    - JobCompLoc
    - JobCompHost
    - JobCompPort
    - JobCompUser
    - JobCompPass
- Job Accounting Storage
  - AccountingStorageType
    - AccountingStorageLoc
    - AccountingStorageHost
    - AccountingStoragePort
    - AccountingStorageUser
    - AccountingStoragePass
    - ClusterName

Click submit to generate the configuration. Then upload it to /etc/slurm-llnl/slurm.conf  

# The protocol to set Multi-Instance GPU
### Run the script below with **root** account
````bash
systemctl stop nvsm
systemctl stop nvidia-dcgm
nvidia-smi -i 2,3,4,5,6,7 --gpu-reset
nvidia-smi -i 2,3,4,5,6,7   -mig 1
nvidia-smi mig -i 2 -cgi 9,14,14 -C
nvidia-smi mig -i 3 -cgi 9,14,14 -C
nvidia-smi mig -i 4 -cgi 19,19,19,19,19,19,19 -C
nvidia-smi mig -i 5 -cgi 19,19,19,19,19,19,19 -C
nvidia-smi mig -i 6 -cgi 19,19,19,19,19,19,19 -C
nvidia-smi mig -i 7 -cgi 19,19,19,19,19,19,19 -C
systemctl start nvsm
systemctl start nvidia-dcgm
````
First two line will turn down the monitor program of the GPUs  
`nvidia-smi -i 2,3,4,5,6,7 --gpu-reset` is to reset the GPUs that are listed in `-i`  
For detail, please check [MIG manual](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/index.html)  

### Restart slurm

##### Computing node
```bash
systemctl restart slurmd
```
##### Login node
```bash
scontrol update nodename=dynomics state=idle
```

### Generate the config file for slurm
[mig](https://gitlab.com/nvidia/hpc/slurm-mig-discovery) is the program from NVIDIA to generate the slurm resouces configuration based on current MIG setting. (support only cuda 11.2+)
````bash
./mig
# this would generate gres.conf and cgroup_allowed_devices_file.conf that are necessary for slurm.
````

### Reconfiguration
When changing MIG config, we need to replace `gres.conf` and `cgroup_allowed_devices_file.conf` with new config.
Also, we need to update the settings of Nodes on `slurm.conf` according to `gres.conf`.
 
# nvidia-mig-parted
Download mig-parted and build
```
git clone http://github.com/NVIDIA/mig-parted -b v0.1.3
cd mig-parted
go build ./cmd/nvidia-mig-parted
```
Generate [mig-config.yaml](./mig-config.yaml)
```
nvidia-mig-parted apply -f mig-config.yaml -c custom-config
```