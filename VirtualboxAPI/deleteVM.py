import virtualbox, sys

# Initialize VirtualBox manager
vbox = virtualbox.VirtualBox()

# Name of the VM to remove
vm_name = sys.argv[1]

try:
    # Find the machine
    machine = vbox.find_machine(vm_name)
    
    # Check if the machine is running and power it off if necessary
    if machine.state == virtualbox.library.MachineState.running:
        session = virtualbox.Session()
        machine.lock_machine(session, virtualbox.library.LockType.shared)
        session.console.power_down()
        session.unlock_machine()

    # Ensure no sessions are open and attempt to unregister the machine
    machine = machine.unregister(virtualbox.library.CleanupMode.full)
    
    # Delete all files associated with the machine
    media = machine.unregister(virtualbox.library.CleanupMode.full)
    progress_objects = [m.delete_storage() for m in media]
    
    # Wait for all delete operations to complete
    for progress in progress_objects:
        progress.wait_for_completion()

    print("The VM has been successfully removed.")
except virtualbox.library.VBoxError as vb_err:
    print(f"VirtualBox error occurred: {vb_err.msg}")
except Exception as e:
    print(f"An error occurred: {e}")


# remove the folder of the vm
import os
os.system("rm -rf /root/VirtualBox\ VMs/{}".format(vm_name))