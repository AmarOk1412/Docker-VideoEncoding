var Files = {};

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , exec = require('child_process').exec
  , util = require('util')
 
app.listen(8080);
 
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
 
io.sockets.on('connection', function (socket) {
		socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
			var Name = data['Name'];
			Files[Name] = {
				FileSize : data['Size'],
				Data     : "",
				Downloaded : 0
			}
			var Place = 0;
			try{
				var Stat = fs.statSync('Temp/' +  Name);
				if(Stat.isFile())
				{
					Files[Name]['Downloaded'] = Stat.size;
					Place = Stat.size / 524288;
				}
			}
			catch(er){} //It's a New File
			fs.open("Temp/" + Name, "a", 0755, function(err, fd){
				if(err)
				{
					console.log(err);
				}
				else
				{
					Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
					socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
				}
			});
	});
	
	socket.on('Upload', function (data){
        var Name = data['Name'];
        Files[Name]['Downloaded'] += data['Data'].length;
        Files[Name]['Data'] += data['Data'];
        if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
        {
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                //Get Thumbnail Here
            });
        }
        else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                Files[Name]['Data'] = ""; //Reset The Buffer
                var Place = Files[Name]['Downloaded'] / 524288;
                var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
                socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
            });
        }
        else
        {
            var Place = Files[Name]['Downloaded'] / 524288;
            var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
            socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
        }
    });
	
	socket.on('MoreData', function (data){
		UpdateBar(data['Percent']);
		var Place = data['Place'] * 524288; //The Next Blocks Starting Position
		var NewFile; //The Variable that will hold the new Block of Data
		if(SelectedFile.webkitSlice) 
			NewFile = SelectedFile.webkitSlice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
		else
			NewFile = SelectedFile.mozSlice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
		FReader.readAsBinaryString(NewFile);
	});
	function UpdateBar(percent){
		document.getElementById('ProgressBar').style.width = percent + '%';
		document.getElementById('percent').innerHTML = (Math.round(percent*100)/100) + '%';
		var MBDone = Math.round(((percent/100.0) * SelectedFile.size) / 1048576);
		document.getElementById('MB').innerHTML = MBDone;
	}
	
	var Path = "http://localhost/";
 
	socket.on('Done', function (data){
		var Content = "Video Successfully Uploaded !!"
		Content += "<img id='Thumb' src='" + Path + data['Image'] + "' alt='" + Name + "'><br>";
		Content += "<button  type='button' name='Upload' value='' id='Restart' class='Button'>Upload Another</button>";
		document.getElementById('UploadArea').innerHTML = Content;
		document.getElementById('Restart').addEventListener('click', Refresh);
	});
	function Refresh(){
		location.reload(true);
	}
	
});