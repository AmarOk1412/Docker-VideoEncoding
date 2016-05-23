FROM resin/rpi-raspbian:jessie

MAINTAINER Team_Docker-VideoEncoding

LABEL status="Dockerfile in development"
LABEL description="gstreamer with hardware access"

WORKDIR /

ENV admin="root"

RUN apt-get update && apt-get install git wget -y
RUN wget https://github.com/hypriot/golang-armbuilds/releases/download/v1.5.2/go1.5.2.linux-armv6.tar.gz
RUN tar xzvf go1.5.2.linux-armv6.tar.gz
RUN mv go /usr/local/
RUN mkdir ~/gocode

ENV GO15VENDOREXPERIMENT=1
ENV GOROOT=/usr/local/go
ENV GOPATH=/root/gocode
ENV PATH=$PATH:$GOPATH/bin:$GOROOT/bin

RUN apt-get install curl ca-certificates -y
RUN /usr/local/go/bin/go get github.com/tools/godep
RUN /usr/local/go/bin/go get github.com/golang/lint/golint
RUN mkdir -p $GOPATH/src/github.com/docker

WORKDIR $GOPATH/src/github.com/docker
RUN git clone https://github.com/AmarOk1412/swarm.git

WORKDIR swarm
RUN go install .

ADD run.sh run.sh
CMD ["/bin/bash" "run.sh"]
