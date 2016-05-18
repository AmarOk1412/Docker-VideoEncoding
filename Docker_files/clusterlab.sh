#!/bin/sh
echo "Creating default daemon.json"
cat << EOF > /etc/docker/daemon.json
{
    "hosts": ["fd://"]
}
EOF

echo "Overwriting systemd docker daemon startup"
mkdir -p /etc/systemd/system/docker.service.d
cat << EOF > /etc/systemd/system/docker.service.d/clusterlab.conf
[Service]
ExecStart=
ExecStart=/usr/bin/docker daemon
EOF

echo "Reloading systemd and restarting docker"
systemctl daemon-reload
systemctl restart docker
