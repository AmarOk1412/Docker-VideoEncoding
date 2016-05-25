FROM resin/rpi-raspbian:jessie

#MAINTAINER Olivier Barais <barais@irisa.fr>
MAINTAINER Team_Docker-VideoEncoding


LABEL status="Dockerfile in development"
LABEL description="gstreamer with hardware access"


WORKDIR /

ENV admin="root"

RUN apt-get -y upgrade &&\
apt-get update &&\
apt-get install gstreamer1.0  libav-tools -y && \
rm -rf /var/cache/apt/*.deb*

ADD ScriptEncode.sh ScriptEncode.sh

