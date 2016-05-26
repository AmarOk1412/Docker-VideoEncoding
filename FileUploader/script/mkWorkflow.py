#!/bin/python
#TODO test
import subprocess
import sys

toEncode = sys.argv[1]
# 1. We need to call split scripts
p = subprocess.Popen("docker -H tcp://node1:2375 run -d -P --name split split " + toEncode + " 5", shell=True, stdout=subprocess.PIPE)
out, err = p.communicate()
print(out)
print("ERROR? " + err)
# 2. We need to encode videos
# TODO for parts, encodeNUMBER waitfor split + give file
for i in range(0,4):
    p = subprocess.Popen("docker -H tcp://node1:2375 run -d -P --waitfor:container==split --name encode" + i + " encode " + toEncode, shell=True, stdout=subprocess.PIPE)
    out, err = p.communicate()
    print(out)
    print("ERROR? " +  err)
# 3. Call the merger script
p = subprocess.Popen("docker -H tcp://node1:2375 run -d -P --waitfor:container==encode* --name merge merge " + toEncode, shell=True, stdout=subprocess.PIPE)
out, err = p.communicate()
print(out)
print("ERROR? " +  err)
# 4. On the node side, we can wait for this script to finish.
