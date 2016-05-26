#!/bin/bash
bleufonce='\e[0;34m'
neutre='\e[0;m'
directory='/uploads/'

soft='avconv'
probe='avprobe'
#if fedora
if [ -f /etc/redhat-release ]; then
	soft='ffmpeg'
fi

#1: file, 2: split
if [ "$#" -ne 2 ]; then
	echo "Illegal number of parameters"
else

	inputFile="$directory"$(grep -Po '(?<="toEncode":")[^"]*' "$directory""$1.json")
	outputFile="$directory"$(grep -Po '(?<="wanted_name":")[^"]*' "$directory""$1.json")
	if [ "$outputFile" == "$directory" ];then
		outputFile="$directory"$(grep -Po '(?<="original_name":")[^"]*' "$1.json")	
	fi
	echo inputFile : $inputFile
	echo outputFile : $outputFile
	outputFileName=$(echo $outputFile | cut -f1 -d '.')

	> "$directory"$1.part
	> "$inputFile"_key_frame.txt

	if [ -f /etc/redhat-release ]; then
		totalTime=$(ffprobe -v quiet -of csv=p=0 -show_entries format=duration "$inputFile")
		ffprobe -v quiet -show_frames -select_streams v -print_format json=c=1 "$inputFile" | grep -Po '("key_frame": 1).*("pkt_pts_time": ")[0-9]*\.[0-9]*' | grep -Po '(?<="pkt_pts_time": ")[0-9]*\.[0-9]*' > "$inputFile"_key_frame.txt
	else
		totalTime=$(avprobe -show_format_entry duration -v quiet "$inputFile")
		avprobe  -v quiet -show_packets -of json "$inputFile" | awk '
$0 ~ /"pts_time" : "([0-9]|\.)*"/ {toPrint=$3}
$0 ~ /"flags" : "K"/ {print toPrint}
' | grep -oE \([0-9]\|\\\.\)*  > "$inputFile"_key_frame.txt
	fi

	echo video duration : $totalTime

	sed 1d "$inputFile"_key_frame.txt -i

	nbKeyFrame=$(sed -n '$=' "$inputFile"_key_frame.txt)
	echo key frame number : $nbKeyFrame

	if [ "$2" -le "$nbKeyFrame" ];then
		nbKeyFrameSplit=$(($nbKeyFrame/$2))
		nbSplit=$2
	else
		nbKeyFrameSplit=1
		nbSplit=$(($nbKeyFrame - 1))
	fi

	startTime=0
	fileCurrentNumber=1

	echo Spliting:
	for ((i=1;i<$nbSplit;i++))
    	do
    		endTime=$(sed -n "$(($nbKeyFrameSplit*$i)) p" "$inputFile"_key_frame.txt)
		splitTime=$(echo "$endTime-$startTime"|bc -l)
    		echo -e ${bleufonce}Split start at: $startTime
    		echo Split end at: $endTime
    		echo Split duration: $splitTime
    		echo -e Split number: $fileCurrentNumber${neutre}

    		"$soft" -y -i "$inputFile" -ss $startTime -t "$splitTime" -codec copy "$outputFileName"_part_"$fileCurrentNumber"
		echo "file '"$outputFileName"_part_"$fileCurrentNumber"" >> "$directory""$1".part

		startTime=$endTime

		fileCurrentNumber=$(($fileCurrentNumber + 1))
	done

	splitTime=$(echo "$totalTime-$startTime"|bc -l)

	echo -e ${bleufonce}Split start at: $startTime
	echo Split end at: $totalTime
    	echo Split duration: $splitTime
    	echo -e Split number: $fileCurrentNumber${neutre}

	"$soft" -y -i "$inputFile" -ss $startTime -t "$splitTime" -codec copy "$outputFileName"_part_"$fileCurrentNumber"
	echo "file '"$outputFileName"_part_"$fileCurrentNumber"" >> "$directory""$1".part

	fi
