#!/bin/bash
soft='ffmpeg'
directory='/uploads/'

#1: file, 2: split
if [ "$#" -ne 1 ]; then
	echo "Illegal number of parameters"
else
	outputFile=$(grep -Po '(?<="wanted_name":")[^"]*' "$directory""$1.json")
	echo outputFile : "$directory"$outputFile

	"$soft" -y -f concat -i "$directory"$1.part -c copy "$directory""$outputFile"
fi
