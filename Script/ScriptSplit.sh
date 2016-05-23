#!/bin/bash
bleufonce='\e[0;34m'
neutre='\e[0;m'

soft='avconv'
probe='avprobe'
#if fedora
if [ -f /etc/redhat-release ]; then
	soft='ffmpeg'
	probe='ffprobe'
fi

#1: file, 2: split
if [ "$#" -ne 2 ]; then
	echo "Illegal number of parameters"
else

	inputFile=$(grep -Po '(?<="original_name":")[^"]*' "$1.json")
	outputFile=$(grep -Po '(?<="wanted_name":")[^"]*' "$1.json")
	echo inputFile : $inputFile
	> $1.part
	> "$inputFile"_key_frame.txt	

	totalTime=$("$probe" -v quiet -show_format_entry duration "$inputFile")
	#totalTime=$("$probe" -v quiet -of csv=p=0 -show_entries format=duration "$inputFile")
	echo video duration : $totalTime

	"$probe" -v quiet -show_frames -select_streams v -print_format json=c=1 "$inputFile" | grep -Po '("key_frame": 1).*("pkt_pts_time": ")[0-9]*\.[0-9]*' | grep -Po '(?<="pkt_pts_time": ")[0-9]*\.[0-9]*' > "$inputFile"_key_frame.txt
	#"$probe" -v quiet -show_frames -select_streams v -print_format json=c=1 "$inputFile" | grep -Po '("key_frame": 1).*("pkt_pts_time": ")[0-9]*\.[0-9]*' | grep -Po '(?<="pkt_pts_time": ")[0-9]*\.[0-9]*' > "$inputFile"_key_frame.txt
	
	sed 1d "$inputFile"_key_frame.txt -i

	nbKeyFrame=$(sed -n '$=' "$inputFile"_key_frame.txt)
	echo $nbKeyFrame

	if [ "$2" -le "$nbKeyFrame" ];then
		nbKeyFrameSplit=$(($nbKeyFrame/$2))
		nbSplit=$2
	else
		nbKeyFrameSplit=1
		nbSplit=$(($nbKeyFrame - 1))
	fi

	echo keyFrame number : $nbKeyFrameSplit

	startTime=0
	fileCurrentNumber=1

	echo Spliting:
	for ((i=1;i<$nbSplit;i++))
    	do
    		endTime=$(sed -n "$(($nbKeyFrameSplit*$i)) p" "$inputFile"key_frame.txt)
		splitTime=$(echo "$endTime-$startTime"|bc -l)
    		echo -e ${bleufonce}Split start at: $startTime
    		echo Split end at: $endTime
    		echo Split duration: $splitTime
    		echo -e Split number: $fileCurrentNumber${neutre}

    		"$soft" -y -i "$1" -ss $startTime -t "$splitTime" -codec copy "$outputFile"_part_"$fileCurrentNumber".mp4
		echo "file '"$outputFile"_part_"$fileCurrentNumber".mp4'" >> "$1".part

		startTime=$endTime

		fileCurrentNumber=$(($fileCurrentNumber + 1))
	done

	splitTime=$(echo "$totalTime-$startTime"|bc -l)

	echo -e ${bleufonce}Split start at: $startTime
	echo Split end at: $totalTime
    	echo Split duration: $splitTime
    	echo -e Split number: $fileCurrentNumber${neutre}

	"$soft" -y -i "$1" -ss $startTime -t "$splitTime" -codec copy "$outputFile"_part_"$fileCurrentNumber".mp4
	echo "file '"$outputFile"_part_"$fileCurrentNumber".mp4'" >> $1.part

fi
