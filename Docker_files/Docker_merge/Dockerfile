FROM resin/rpi-raspbian:jessie

#MAINTAINER Olivier Barais <barais@irisa.fr>
MAINTAINER Team_Docker-VideoEncoding

LABEL status="Dockerfile in development"
LABEL description="Split"

WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get install -y git
RUN GIT_SSL_NO_VERIFY=true git clone https://github.com/AmarOk1412/Docker-VideoEncoding.git

WORKDIR Docker-VideoEncoding
WORKDIR Script

CMD ["/bin/bash","ScriptSplit.sh"]
