#!/bin/bash
docker daemon -H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock
docker pull mastertheif/rpi-glusterfs-rest
#docker pull mastertheif/rpi_encoder
docker rm server_gluster; docker run -d --privileged=true --net=host --name server_gluster -P mastertheif/rpi-glusterfs-rest
docker-volume-glusterfs -servers node1 &
swarm join --addr=$(/sbin/ip -4 -o addr show dev eth0| awk '{split($4,a,"/");print a[1]}'):2375 token://379789d12bda998f622148bc13274b9a &


if [  "$HOSTNAME" = "node1" ] ; then
docker pull mastertheif/rpi_merge
docker pull mastertheif/rpi_split
swarm manage -c state token://379789d12bda998f622148bc13274b9a &
	while true; do
		nmap -sP 192.168.1.* | grep -o 'node[0-9]\+' > /home/pi/alivehosts
		curl -X GET http://pi:toor@node1:8080/api/1.0/peers | grep -o 'node[0-9]\+' > /home/pi/connectedhosts; echo node1 >> connectedhosts 
		
		#if no volumes created and alivehosts != node1 		diff /home/pi/alivehosts /home/pi/connectedhosts | grep -o 'node[0-9]\+'

			#Ceate node replica 2 node1+node

		if [[ $( diff alivehosts connectedhosts | wc -l) -gt 2 ]] ; then
			#expand docker exec server_glusterfs gluster
			#resize docker exec server_glusterfs gluster
			echo test
		fi
		sleep 120
	done
else
#start swarm join
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
