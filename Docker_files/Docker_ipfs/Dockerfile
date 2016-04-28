FROM resin/rpi-raspbian:jessie

MAINTAINER Team_Docker-VideoEncoding


LABEL status="Dockerfile in development"
LABEL description="IPFS on RPi"


WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get install gstreamer1.0 libav-tools -y && \
rm -rf /var/cache/apt/*.deb*

CMD ["gst-launch-1.0 -e filesrc location=$input.mp4 ! decodebin name=demux ! queue ! audioconvert ! audio/x-raw ! audiorate ! avenc_ac3 bitrate=320000 ! mux. mpegtsmux name=mux ! filesink location=\"$output.h264\" demux. ! queue ! videoconvert ! deinterlace ! omxh264enc target-bitrate=2000000 control-rate=1  ! \"video/x-h264,profile=high\" ! h264parse ! mux."]