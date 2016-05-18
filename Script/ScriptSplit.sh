#!/bin/bash"
bleufonce='\e[0;34m'
neutre='\e[0;m'

if [ "$#" -ne 2 ]; then
	echo "Illegal number of parameters"
else

	> file.txt
	> key_frame.txt

	totalTime=$(ffprobe -v quiet -of csv=p=0 -show_entries format=duration "$1")
	echo $totalTime
	

	ffprobe -v quiet -show_frames -select_streams v -print_format json=c=1 "$1" | grep -Po '("key_frame": 1).*("pkt_pts_time": ")[0-9]*\.[0-9]*' | grep -Po '(?<="pkt_pts_time": ")[0-9]*\.[0-9]*' > key_frame.txt
	sed 1d key_frame.txt -i

	nbKeyFrame=$(sed -n '$=' key_frame.txt)
	echo $nbKeyFrame

	
	if [ "$2" -le "$nbKeyFrame" ];then
		nbKeyFrameSplit=$(($nbKeyFrame/$2))
		
		nbSplit=$2
	else
		nbKeyFrameSplit=1
		nbSplit=$(($nbKeyFrame - 1))
	fi

	echo $nbKeyFrameSplit

	startTime=0
	fileCurrentNumber=1

	echo Spliting:
	for ((i=1;i<$nbSplit;i++))
    	do
    	endTime=$(sed -n "$(($nbKeyFrameSplit*$i)) p" key_frame.txt)   
		splitTime=$(echo "$endTime-$startTime"|bc -l)
    	echo -e ${bleufonce}Split start at: $startTime
    	echo Split end at: $endTime
    	echo Split duration: $splitTime
    	echo -e Split number: $fileCurrentNumber${neutre}
    	
    	avconv -y -i "$1" -ss $startTime -t "$splitTime" -codec copy test"$fileCurrentNumber".mp4	
		echo "file 'test"$fileCurrentNumber".mp4'" >> file.txt

		startTime=$endTime
		
		fileCurrentNumber=$(($fileCurrentNumber + 1))
	done

	splitTime=$(echo "$totalTime-$startTime"|bc -l)
	
	echo -e ${bleufonce}Split start at: $startTime
	echo Split end at: $totalTime
    echo Split duration: $splitTime
    echo -e Split number: $fileCurrentNumber${neutre}
    	
	avconv -y -i "$1" -ss $startTime -t "$splitTime" -codec copy test"$fileCurrentNumber".mp4	
	echo "file 'test"$fileCurrentNumber".mp4'" >> file.txt

	avconv -y -f concat -i file.txt -c copy testComplet.mp4
fi