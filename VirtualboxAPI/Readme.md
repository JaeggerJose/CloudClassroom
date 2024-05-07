# This API is for opearting a virtualbox virtual machine with template file (win11_template.ova)
> Warning: Remenber to modify the template file location in `createVM.py`

## Create A Virtual Machine
```BASH
python3 createVM.py <VM Name> <CPU Number> <Memory Size>
```

## Delete A Virtual Machine 
**To Check all VM name you can use `vboxmanage list vms`**

```BASH
python3 deleteVM.py <VM Name>
```