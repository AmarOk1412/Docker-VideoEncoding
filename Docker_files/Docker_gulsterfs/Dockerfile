FROM resin/rpi-raspbian:jessie


ENV SERVICE_NAME "gluster"
ENV GLUSTER_DATA "/data"
ENV GLUSTER_VOLUMES "ranchervol"
ENV GLUSTER_TRANSPORT "tcp"
ENV GLUSTER_REPLICA 2
# Use it ig you should stripe your module
#ENV GLUSTER_STRIPE 1
# Use it if you should put some quota on your volume
#ENV GLUSTER_QUOTA "1GB"


RUN apt-get update && \
    apt-get install -y glusterfs-server git


# CLEAN APT
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD []
