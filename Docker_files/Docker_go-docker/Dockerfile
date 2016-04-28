FROM resin/rpi-raspbian:jessie
MAINTAINER Olivier Sallou <olivier.sallou@irisa.fr>

LABEL status="Dockerfile in development"
LABEL description="Batch scheduling system in containers. This image contains \
 all godocker components: web, scheduler and watchers. \
 Config should be overriden in /opt/godocker/go-d.ini \
 file. Default configuration does not provide mail and only fake \
 authentication."

EXPOSE 6543

WORKDIR /opt/go-docker

ENV admin="root"
ENV swarm_url="tcp://god-swarm:2375"

RUN apt-get update
RUN apt-get install -y git python-dev libldap2-dev gcc libsasl2-dev
RUN apt-get install -y python-setuptools apt-transport-https wget
RUN apt-get install -y openssl libffi-dev libssl-dev ca-certificates

RUN cd /opt && git clone https://bitbucket.org/osallou/go-docker.git
RUN rm -f /opt/go-docker/plugins/mesos.*
RUN cd /opt && git clone https://bitbucket.org/osallou/go-docker-web.git
RUN easy_install pip
RUN cd /opt/go-docker && pip install -r requirements.txt
RUN cd /opt/go-docker && python setup.py develop
RUN cd /opt/go-docker-web && pip install -r requirements.txt
RUN cd /opt/go-docker-web && python setup.py develop
RUN pip install godocker_cli
RUN cd /opt/go-docker-web && cp production.ini.example production.ini
RUN cd /opt/go-docker-web && sed -i 's;global_properties =.*;global_properties = /opt/go-docker/go-d.ini;g' production.ini
RUN cd /opt/go-docker-web && sed -i 's;admin =.*;admin = '${admin}';g' production.ini
RUN cd /opt/go-docker && cp go-d.ini.sample go-d.ini
RUN cd /opt/go-docker && sed -i "s;plugins_dir:.*;plugins_dir: '/opt/go-docker/plugins';g" go-d.ini
RUN cd /opt/go-docker && sed -i "s;shared_dir:.*;shared_dir: '/opt/godshared';g" go-d.ini
RUN cd /opt/go-docker && sed -i "s;mongo_url:.*;mongo_url:'mongodb://god-mongo:27017';g" go-d.ini
RUN cd /opt/go-docker && sed -i "s;redis_host:.*;redis_host:'god-redis';g" go-d.ini
RUN cd /opt/go-docker && sed -i "s;influxdb_host:.*;influxdb_host: None;g" go-d.ini
RUN cd /opt/go-docker && sed -i "s;prometheus_exporter:.*;prometheus_exporter: 'god-web:6543';g" go-d.ini
RUN cd /opt/go-docker && sed -i "s;docker_url:.*;docker_url: '"${swarm_url}"';g" go-d.ini
RUN mkdir -p /var/log/go-docker
