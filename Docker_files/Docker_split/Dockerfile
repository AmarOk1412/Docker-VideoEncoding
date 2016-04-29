FROM resin/rpi-raspbian:jessie

#MAINTAINER Olivier Barais <barais@irisa.fr>
MAINTAINER Team_Docker-VideoEncoding


LABEL status="Dockerfile in development"
LABEL description="gstreamer with hardware access"


WORKDIR /

ENV admin="root"

#RUN echo "deb http://vontaene.de/raspbian-updates/ . main" >> /etc/apt/sources.list
#RUN apt-get update && \
#apt-get -y upgrade && \
#apt-get install gstreamer1.0-tools gstreamer1.0-omx  -y && \
#apt-get install gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly  gstreamer1.0-plugins-good  gstreamer1.0-plugins-base  -y && \



RUN apt-get update && \
apt-get -y upgrade && \
apt-get install libav-tools -y && \
rm -rf /var/cache/apt/*.deb*

CMD ["gst-launch-1.0 -e filesrc location=$input.mp4 ! decodebin name=demux ! queue ! audioconvert ! audio/x-raw ! audiorate ! avenc_ac3 bitrate=320000 ! mux. mpegtsmux name=mux ! filesink location=\"$output.h264\" demux. ! queue ! videoconvert ! deinterlace ! omxh264enc target-bitrate=2000000 control-rate=1  ! \"video/x-h264,profile=high\" ! h264parse ! mux."]
