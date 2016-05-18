var express	=	require("express");
var multer	=	require('multer');
var app	=	express();
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));

var fname = '';
var originalName = '';
var bitrate = '';

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    fname = 'toEncode_' + Date.now();
    originalName = file.originalname;
    callback(null, fname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/upload',function(req,res){
	upload(req,res,function(err) {
    //TODO write fname, originalName, wantedname in json file
    var wantedname = req.body.name;
    var bitrate = req.body.bitrate;
    console.log(fname)
    console.log(originalName)
    console.log(wantedname)
    console.log(bitrate)
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
