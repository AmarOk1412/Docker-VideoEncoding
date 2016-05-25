#!/bin/bash

if [  "$HOSTNAME" = "node1" ] ; then
	echo node1
	
else

	while true; do
		if sudo nmap -sP 192.168.1.* | grep -q 'node1 (' && echo -e '\a'; then
			if curl -X GET http://pi:toor@node1:8080/api/1.0/peers | grep -q "\"&HOSTNAME\"" && echo -e '\a'; then
				break
			else
				curl -X POST "http://pi:toor@node1:8080/api/1.0/peer/$HOSTNAME"
			fi
		fi
		sleep 30
		done
fi
