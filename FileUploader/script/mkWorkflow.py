#!/bin/python
#TODO test
import subprocess
import sys

toEncode = sys.argv[1]
# 1. We need to call split scripts
p = subprocess.Popen("docker -H tcp://localhost:2375 run --volume-driver=glusterfs --volume uploads:/uploads -d -P --name split split /bin/bash ScriptSplit.sh " + toEncode + " 5", shell=True, s$
out, err = p.communicate()
print(out)
# 2. We need to encode videos
# TODO for parts, encodeNUMBER waitfor split + give file
for i in range(0,4):
    p = subprocess.Popen("docker -H tcp://localhost:2375 run --volume-driver=glusterfs --volume uploads:/uploads -d -P -e waitfor:container==split --name encode" + str(i) + " encode /bin/bash S$
    out, err = p.communicate()
    print(out)
# 3. Call the merger script
p = subprocess.Popen("docker -H tcp://localhost:2375 run --volume-driver=glusterfs --volume uploads:/uploads -d -P -e waitfor:container==encode* --name merge merge /bin/bash ScriptMerge.sh " + $
out, err = p.communicate()
print(out)
# 4. On the node side, we can wait for this script to finish.
