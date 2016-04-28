FROM resin/rpi-raspbian:jessie

MAINTAINER Olivier Barais <barais@irisa.fr>

LABEL status="Dockerfile in development"
LABEL description="Udpcast on top od alpine"


WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get install -y udpcast && \
rm -rf /var/cache/apt/*.deb*

CMD ["/usr/bin/udp-sender"]
