FROM resin/rpi-raspbian:jessie

MAINTAINER Team_Docker-VideoEncoding

LABEL status="Dockerfile in development"
LABEL description="Merge"

WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get remove libavcodec-extra-56 libavformat56 libavresample2 libavutil54 -y && \
apt-get install libopencore-amr* libavutil54 libavformat56 libswscale3 libdc1394* wget -y

RUN wget --no-check-certificate https://github.com/ccrisan/motioneye/wiki/precompiled/ffmpeg_2.8.3.git325b593-1_armhf.deb
RUN dpkg -i ffmpeg_2.8.3.git325b593-1_armhf.deb

RUN apt-get install -y

ADD ScriptMerge.sh ScriptMerge.sh

CMD ["/bin/bash","ScriptMerge.sh"]
