FROM resin/rpi-raspbian:jessie

WORKDIR /

ENV admin="root"

RUN apt-get update && apt-get -y upgrade && \
apt-get install gstreamer1.0-tools gstreamer1.0-omx  -y && \
apt-get install gstreamer1.0-libav gstreamer1.0-fluendo-mp3 gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly  gstreamer1.0-plugins-good  gstreamer1.0-plugins-base libav-tools -y && \
rm -rf /var/cache/apt/*.deb*

ADD ScriptEncode.sh ScriptEncode.sh

CMD [ /bin/bash ]