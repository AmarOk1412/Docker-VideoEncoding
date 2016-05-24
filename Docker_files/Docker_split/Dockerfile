FROM resin/rpi-raspbian:jessie

MAINTAINER Team_Docker-VideoEncoding

LABEL status="Dockerfile in development"
LABEL description="Split"

WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get install -y libav-tools bc

ADD ScriptSplit.sh ScriptSplit.sh

CMD ["/bin/bash","ScriptSplit.sh"]
