#!/bin/bash
soft='ffmpeg'
directory='/uploads/'

#1: JSON name
if [ "$#" -ne 1 ]; then
	echo "Illegal number of parameters"
else
	outputFile="$directory"$(grep -Po '(?<="wanted_name":")[^"]*' "$directory""$1.json")
	if [ "$outputFile" == "$directory" ];then
		outputFile="$directory"$(grep -Po '(?<="original_name":")[^"]*' "$directory""$1.json")	
	fi
	echo outputFile : $outputFile
	outputFileName=$(echo $outputFile | cut -f1 -d '.')

	"$soft" -y -f concat -i "$directory"$1.part -c copy "$outputFileName".mp4
fi
