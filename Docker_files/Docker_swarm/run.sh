git pull
go install .
$GOPATH/bin/swarm create
$GOPATH/bin/swarm manage token://<cluster_id>
$GOPATH/bin/swarm join --addr=<node_ip:2375> token://<cluster_id>
