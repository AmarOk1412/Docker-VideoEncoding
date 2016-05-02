FROM resin/rpi-raspbian:jessie

MAINTAINER Team_Docker-VideoEncoding

LABEL status="Dockerfile in development"
LABEL description="IPFS on RPi"


WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get -y install wget && \
rm -rf /var/cache/apt/*.deb*

RUN wget http://storage.googleapis.com/golang/go1.6.2.linux-armv6l.tar.gz
RUN wget http://dist.ipfs.io/go-ipfs/v0.4.1/go-ipfs_v0.4.1_linux-arm.tar.gz
RUN wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
RUN dpkg -i node_latest_armhf.deb
RUN tar -C /usr/local -xzf go1.6.2.linux-armv6l.tar.gz
RUN tar -C / -xzf go-ipfs_v0.4.1_linux-arm.tar.gz

WORKDIR /go-ipfs
RUN ./install.sh
WORKDIR /

RUN rm -r /go-ipfs
RUN rm *.tar.gz
RUN rm *.deb


ENV PATH=$PATH:/usr/local/go/bin



CMD []
