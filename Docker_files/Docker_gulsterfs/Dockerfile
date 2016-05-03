FROM resin/rpi-raspbian:jessie

RUN apt-get update && \
    apt-get install -y glusterfs-server git

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN update-rc.d glusterfs-server defaults

EXPOSE 111 245 443 24007 2049 8080 6010 6011 6012 38465 38466 38468 38469 49152 49153 49154 49156 49157 49158 49159 49160 49161 49162 49163

CMD []
