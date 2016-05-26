#!/bin/bash
directory='/uploads/'

#1: json name, part number
if [ "$#" -ne 2 ]; then
	echo "Illegal number of parameters"
else
	outputFile="$directory"$(grep -Po '(?<="wanted_name":")[^"]*' "$directory""$1.json")
	if [ "$outputFile" == "$directory" ];then
		outputFile="$directory"$(grep -Po '(?<="original_name":")[^"]*' "$directory""$1.json")	
	fi
	echo outputFile : $outputFile
	outputFileName=$(echo $outputFile | cut -f1 -d '.')
	bitRate=$(grep -Po '(?<="bitrate":")[^"]*' "$directory""$1.json")
	if [ -z "$bitRate" ];then
		bitRate=$(avconv -i "$outputFileName"_part_"$2".mp4 2>&1 | awk '/bitrate/ {print $(NF-1)}')
	fi 
	echo bitRate : $bitRate

	gst-launch-1.0 -v filesrc location="$outputFileName"_part_"$2".mp4 ! decodebin ! videoconvert ! \
	videoscale ! omxh264enc control-rate=1 \
	target-bitrate="$bitRate" ! h264parse ! mp4mux ! \
	filesink location="$outputFileName"_part_"$2"_encoded.mp4

fi