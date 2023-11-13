#!/bin/bash
uids=$( cat /etc/passwd | cut -d: -f3 | sort -n )
uid=999

while true; do
    if ! echo $uids | grep -F -q -w "$uid"; then
        break;
    fi

    uid=$(( $uid + 1))
done

echo $uid
