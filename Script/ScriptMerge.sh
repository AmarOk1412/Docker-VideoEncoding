#!/bin/bash
soft='avconv'
#if fedora
if [ -f /etc/redhat-release ]; then
	soft='ffmpeg'
fi

#1: file, 2: split
if [ "$#" -ne 1 ]; then
	echo "Illegal number of parameters"
else
	outputFile=$(grep -Po '(?<="wanted_name":")[^"]*' "$1.json")
	echo ouputFile : $ouputFile

	"$soft" -y -f concat -i $1.part -c copy "$ouputFile"
fi