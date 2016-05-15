FROM resin/rpi-raspbian:jessie

RUN apt-get update && \
    apt-get install -y glusterfs-server git

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 111 2049 24007 24008 38465 38466 38467 49152 49153 49154 49156 49157 49158 49159 49160 49161 49162 49163

CMD [service glusterfs-server start]
