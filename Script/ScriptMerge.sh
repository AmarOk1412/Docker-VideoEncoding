#!/bin/bash
soft='ffmpeg'

#1: file, 2: split
if [ "$#" -ne 1 ]; then
	echo "Illegal number of parameters"
else
	outputFile=$(grep -Po '(?<="wanted_name":")[^"]*' "$1.json")
	echo outputFile : $outputFile

	"$soft" -y -f concat -i $1.part -c copy "$outputFile"
fi
