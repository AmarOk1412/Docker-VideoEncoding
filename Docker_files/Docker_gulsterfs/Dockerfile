FROM resin/rpi-raspbian:jessie

RUN apt-get update && \
    apt-get install -y glusterfs-server git

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD []
