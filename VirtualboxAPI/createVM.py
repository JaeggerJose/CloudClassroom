import os, sys, time
import subprocess
argv = sys.argv
# if contain --help 
if "--help" in argv:
    print("Usage: python3 main.py <vmName>")
    sys.exit(0)
# --name of the vm
if len(argv) < 2:
    print("Usage: python3 main.py <vmName>")
    sys.exit(0)
vmName = argv[1]
cpuNum = argv[2]
memNum = argv[3]

import socket

def find_available_port():
    # Create a socket object
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        # Bind the socket to any available address and a port
        s.bind(('', 0))
        # Get the socket's own address and port
        addr, port = s.getsockname()
        return port

# Call the function and print the available port
portNum = find_available_port()

# open vm 
cmd = "VBoxManage import /home/ccllab/win11_template.ova --vsys 0 --vmname {0} --cpus {1} --memory {2}".format(vmName, cpuNum, memNum)
subprocess.run([cmd], shell=True)
time.sleep(30)
# remove old port forwarding rule
cmd = "VBoxManage modifyvm {} --natpf1 delete \'Rule 1\'".format(vmName)
subprocess.run([cmd], shell=True)

# add new port forwarding rule
cmd = "VBoxManage modifyvm {0} --natpf1 \'Rule 1,tcp,,{1},,3389\'".format(vmName, portNum)
subprocess.run([cmd], shell=True)

# start vm
cmd = "VBoxManage startvm {} --type=headless".format(vmName)
subprocess.run([cmd], shell=True)
print("Port forwarding has been updated to forward port {} to port 3389.".format(portNum))
