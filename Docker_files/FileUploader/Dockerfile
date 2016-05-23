FROM resin/rpi-raspbian:jessie

MAINTAINER Team_Docker-VideoEncoding

LABEL status="Dockerfile in development"
LABEL description="File uploader interface"

WORKDIR /

ENV admin="root"

RUN apt-get update && \
apt-get -y upgrade && \
apt-get install -y git wget
RUN GIT_SSL_NO_VERIFY=true git clone https://github.com/AmarOk1412/Docker-VideoEncoding.git

WORKDIR Docker-VideoEncoding
WORKDIR FileUploader

RUN wget http://node-arm.herokuapp.com/node_latest_armhf.deb
RUN dpkg -i node_latest_armhf.deb
RUN npm isntall #Yeap, it works, so...
RUN npm isntall jsonfile #TODO remove this line
RUN mkdir uploads

EXPOSE 3000

CMD ["node","Server.js"]
