var express	=	require("express");
var multer	=	require('multer');
var jsonfile = require('jsonfile');
var cp = require("child_process");

var app	=	express();
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));

var fname = '';
var originalName = '';
var bitrate = '';

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/uploads');
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
    var wantedName = req.body.name;
    var brate = req.body.bitrate;
    console.log(fname);
    console.log(originalName);
    console.log(wantedName);
    console.log(brate);
    var jsonfile = require('jsonfile');

    var file = '/uploads/'+fname+'.json';
    var obj = {toEncode: fname, original_name: originalName, wanted_name: wantedName, bitrate: brate};

    jsonfile.writeFile(file, obj, function (err) {
      console.error(err)
    })
    if(err) {
      return res.end("Error uploading file.");
    }
    cp.exec("python3 script/mkWorkflow.py " + fname);
    res.end("File is uploaded");
  });
});

app.listen(3000,function(){
  console.log("Working on port 3000");
});
