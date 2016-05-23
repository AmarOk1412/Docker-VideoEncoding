#!/bin/bash
bleufonce='\e[0;34m'
neutre='\e[0;m'

soft='avconc'
#if fedora
if [ -f /etc/redhat-release ]; then
	soft='ffmpeg'
fi

#1: file, 2: split
if [ "$#" -ne 2 ]; then
	echo "Illegal number of parameters"
else
	"$soft" -y -f concat -i file.txt -c copy testComplet.mp4
