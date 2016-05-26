#!/bin/bash

if [  "$HOSTNAME" = "node1" ] ; then
#start swarm manager
docker rm swarm;docker run -d --name swarm -p 2375:2375 mastetheif/swarm /root/gocode/bin/swarm  join --addr=$IPADD:2375 token://Docker_video_encode
	while true; do
		nmap -sP 192.168.1.* | grep -o 'node[0-9]\+' > /home/pi/alivehosts
		curl -X GET http://pi:toor@node1:8080/api/1.0/peers | grep -o 'node[0-9]\+' > /home/pi/connectedhosts; echo node1 >> connectedhosts 
		
		#if no volumes created and alivehosts != node1 		diff /home/pi/alivehosts /home/pi/connectedhosts | grep -o 'node[0-9]\+'

			#Ceate node replica 2 node1+node

		if [[ $( diff alivehosts connectedhosts | wc -l) -gt 2 ]] ; then
			#expand docker run exec
			#resize docker run exec
			echo test
		fi
		sleep 120
	done
else
#start swarm join
docker rm swarm;docker run -d --rm --name swarm -p 2375:2375 mastetheif/swarm /root/gocode/bin/swarm manage -c state token://Docker_video_encode
sleep $[ ( $RANDOM % 60 )  + 1 ]s
	while true; do
		if nmap -sP 192.168.1.* | grep -q 'node1 (' && echo -e '\a'; then
			if curl -X GET http://pi:toor@node1:8080/api/1.0/peers | grep -q "\"&HOSTNAME\"" && echo -e '\a'; then
				break
			else
				curl -X POST "http://pi:toor@node1:8080/api/1.0/peer/$HOSTNAME"
			fi
		fi
		sleep 30
		done
fi
