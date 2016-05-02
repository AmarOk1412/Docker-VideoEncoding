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
		catch(er){}
		fs.open("Temp/" + Name, "a", 0755, function(err, fd){
			if(err)
			{
				console.log(err);
			}
			else
			{
				Files[Name]['Handler'] = fd;
				socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
			}
		});
	});
	
	socket.on('Upload', function (data){
        var Name = data['Name'];
        Files[Name]['Downloaded'] += data['Data'].length;
        Files[Name]['Data'] += data['Data'];
        if(Files[Name]['Downloaded'] == Files[Name]['FileSize'])
        {
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
				var inp = fs.createReadStream("Temp/" + Name);
				var out = fs.createWriteStream("Video/" + Name);
				util.pump(inp, out, function(){
    				fs.unlink("Temp/" + Name, function () {
						exec("ffmpeg -i Video/" + Name  + " -ss 1 -r 1 -an -vframes 1 -f mjpeg Video/" + Name  + ".jpg", function(err){
						socket.emit('Done', {'Image' : 'Video/' + Name + '.jpg'});
						});
					});
				});
            });
        }
        else if(Files[Name]['Data'].length > 10485760){
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                Files[Name]['Data'] = "";
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
});