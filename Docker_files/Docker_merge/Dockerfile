FROM resin/rpi-raspbian:jessie

MAINTAINER Team_Docker-VideoEncoding

LABEL status="Dockerfile in development"
LABEL description="Merge"

WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get install -y libav-tools bc

ADD ScriptMerge.sh ScriptMerge.sh

CMD ["/bin/bash","ScriptMerge.sh"]
