#!/bin/bash
soft='ffmpeg'
directory='/uploads/'

#1: JSON name
if [ "$#" -ne 1 ]; then
	echo "Illegal number of parameters"
else
	outputFile=$(grep -Po '(?<="wanted_name":")[^"]*' "$directory""$1.json")
	if [ "$outputFile" == "$directory" ];then
		outputFile="$directory"$(grep -Po '(?<="original_name":")[^"]*' "$1.json")	
	fi
	echo outputFile : "$directory"$outputFile

	"$soft" -y -f concat -i "$directory"$1.part -c copy "$directory""$outputFile"
fi
