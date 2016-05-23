#!/bin/python

import subprocess
import sys

toEncode = sys.argv[1]
# 1. We need to call split scripts
p = subprocess.Popen("docker -H tcp://localhost:2378 run -d -P --name split split " + toEncode + " 1000000", shell=True, stdout=subprocess.PIPE)
out, err = p.communicate()
print(out)
print("ERROR? " + err)
# 2. We need to encode videos
# 3. Call the merger script
p = subprocess.Popen("docker -H tcp://localhost:2378 run -d -P --waitfor:container==split --name merge merge " + toEncode, shell=True, stdout=subprocess.PIPE)
out, err = p.communicate()
print(out)
print("ERROR? " +  err)
# 4. On the node side, we can wait for this script to finish.
