# this script will put the VM to sleep

import os, virtualbox, sys

vbox = virtualbox.VirtualBox()

if len(sys.argv) != 2:
    print("Usage: {} <vm_name>".format(sys.argv[0]))
    sys.exit(1)

vm_name = sys.argv[1]

vm = vbox.find_machine(vm_name)
if not vm:
    print("VM {} not found".format(vm_name))
    sys.exit(1)

if vm.state != virtualbox.library.MachineState.running:
    print("VM {} is not running".format(vm_name))
    sys.exit(1)


cmd = "VBoxManage controlvm {} savestate".format(vm_name)

os.system(cmd)

