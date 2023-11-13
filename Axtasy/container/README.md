# Build a100 container

## Initial a lxc pool

- init setting

    ```bash
    root@dynomics:/home/labadmin# lxd init
    Would you like to use LXD clustering? (yes/no) [default=no]:
    Do you want to configure a new storage pool? (yes/no) [default=yes]:
    Name of the new storage pool [default=default]:
    Name of the storage backend to use (dir, lvm, zfs, ceph, btrfs) [default=zfs]:
    Create a new ZFS pool? (yes/no) [default=yes]:
    Would you like to use an existing empty block device (e.g. a disk or partition)? (yes/no) [default=no]:
    Size in GB of the new loop device (1GB minimum) [default=30GB]:
    Would you like to connect to a MAAS server? (yes/no) [default=no]:
    Would you like to create a new local network bridge? (yes/no) [default=yes]:
    What should the new bridge be called? [default=lxdbr0]:
    What IPv4 address should be used? (CIDR subnet notation, “auto” or “none”) [default=auto]:
    What IPv6 address should be used? (CIDR subnet notation, “auto” or “none”) [default=auto]:
    Would you like the LXD server to be available over the network? (yes/no) [default=no]:
    Would you like stale cached images to be updated automatically? (yes/no) [default=yes]
    Would you like a YAML "lxd init" preseed to be printed? (yes/no) [default=no]:
    ```

## Create a100 container

```bash
lxc launch ubuntu:20.04 a100
```

## Edit the config file

```bash
lxc config edit a100
```

- a100 [config](./lxc%20config)
```
config:
  boot.autostart: "true"
  limits.cpu: "8"
  limits.memory: 32GB
  raw.apparmor: mount fstype=nfs,
  security.nesting: "true"
  security.privileged: "true"
devices:
  eth1:
    name: eth1
    nictype: macvlan
    parent: enp226s0
    type: nic
  eth2:
    name: eth2
    nictype: bridged
    parent: lxcbr0
    type: nic
  home:
    path: /home
    source: /home
    type: disk
  modules:
    path: /usr/share/modules
    source: /usr/share/modules
    type: disk
  nas_1:
    path: /mnt/nas_1
    source: /mnt/nas_1
    type: disk
  opt:
    path: /opt
    source: /opt
    type: disk
  raid:
    path: /raid
    source: /raid
    type: disk

```

Limit the cpus
```bash
lxc config set a100 limits.cpu 124-127,252-255
```

```bash
lxc restart a100
```

## Login a100

```bash
lxc exec a100 bash
```

Edit the netplan config /etc/netplan/50-cloud-init.yaml

```bash
# This file is generated from information provided by the datasource.  Changes
# to it will not persist across an instance reboot.  To disable cloud-init's
# network configuration capabilities, write a file
# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
# network: {config: disabled}
network:
    version: 2
    ethernets:
        eth0: {}
        eth1:
            addresses: {static-ip}
            gateway4: {ip-gateway}
            nameservers:
                    addresses: [8.8.8.8, 8.8.4.4]
        eth2:
            dhcp4: yes
```
```bash
netplan apply
```

## Add ldap client

[example](https://save.praexisio.com.tw/gitlab/kuenway/prx-ldap)

## Edit /etc/ssh/sshd_config

[sshd_config](./sshd_config)
```bash
# Authentication:
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysCommand /usr/local/bin/ldap_ssh
AuthorizedKeysCommandUser nobody
AuthorizedKeysFile   none # %h/.ssh/authorized_keys

PasswordAuthentication yes
```
## Set Strong Password Policy
- The password length cannot be less than 8.
- Require at least one uppercase character, one lowercase character and one digit.
- Password cannot contains the name of the user in either straight or reversed form.
```bash
apt install libpam-pwquality
vim /etc/pam.d/common-password
```

```bash
password        requisite                       pam_pwquality.so retry=3 minlen=8 ucredit=-1 lcredit=-1 dcredit=-1 reject_username
password        [success=2 default=ignore]      pam_unix.so obscure use_authtok try_first_pass sha512
password        [success=1 user_unknown=ignore default=die]     pam_ldap.so try_first_pass
```
## Add login page and remove old informations

```bash
cd /etc/update-motd.d
chmod -x *

apt update
apt install neofetch
bash -c $'echo "neofetch --memory_percent on --disable packages shell term --color_blocks off --cpu_temp C --kernel_shorthand off" >> /etc/profile.d/mymotd.sh && chmod +x /etc/profile.d/mymotd.sh'
```
