#!/bin/bash

sed -i "s/raspberrypi/$1/g" /etc/hostname
sed -i "s/raspberrypi/$1/g" /etc/hosts
/etc/init.d/hostname.sh

curl -s https://packagecloud.io/install/repositories/Hypriot/Schatzkiste/script.deb.sh | bash
apt-get install -y docker-hypriot git glusterfs-client nmap
systemctl disable docker

usermod -a -G docker pi

wget --no-check-certificate https://bfb87ab16c3c18c716b289fef83f99937c01c202.googledrive.com/host/0B3yka9lv3tmsT0M2Y3Q2aVV2cHc/docker-volume-glusterfs -P /usr/local/bin
wget --no-check-certificate https://bfb87ab16c3c18c716b289fef83f99937c01c202.googledrive.com/host/0B3yka9lv3tmsT0M2Y3Q2aVV2cHc/swarm -P /usr/local/bin

chmod 755 /usr/local/bin/swarm
chmod 755 /usr/local/bin/docker-volume-glusterfs

wget --no-check-certificate https://raw.githubusercontent.com/AmarOk1412/Docker-VideoEncoding/master/Docker_files/rolling_gluster.sh -P /
chmod 755 /rolling_gluster.sh

crontab -l | { cat; echo "@reboot sudo /rolling_gluster.sh &"; } | crontab -

reboot
