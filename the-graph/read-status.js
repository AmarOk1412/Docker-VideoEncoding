class Container{
	constructor(cName, cImage, cStatus){
		this.Name = cName;
		this.Image = cImage;
		this.Status = cStatus;
	}
}

//Ajout manuel des images car on n'a pas accès au swarm
var containerList = new Array();

var ct1 = new Container("split","split","exited");
containerList.push(ct1);

for(var i=0;i<6;i++){
	containerList.push(new Container("Nom"+i,"encode"+i,"running")); 
}
var ct2 = new Container("merge","merge","running");
containerList.push(ct2);

//Permet de compter le nombre d'images encode
function countEncodeImg(){
	var nbEncode = 0;
	for(var i in containerList){
		if(containerList[i].Image.substring(0,6)=="encode"){
			nbEncode++;
		}
	}	
	return nbEncode;
}

//Permet de charger la librairie nécessaire
function loadLibrary(){
	var library={};
	var nbEncode = countEncodeImg();
	library.merge = {
			"name" : "merge",
            "description" : "merge the parts of the video",
            "icon" : "camera",
            "inports" : [],
            "outports" : [
              {"name": "out", "type": "all"}
            ]
	};
	for(var i=0; i<nbEncode; i++){
			var portName = "in"+i
			library.merge.inports.push({"name" : portName, "type" : "all"})
	}
	library.split = {			
			"name" : "split",
            "description" : "split the video into parts",
            "icon" : "camera",
            "inports" : [
				{"name": "in", "type": "all"}
			],
            "outports": []
	};
	for(var i=0; i<nbEncode; i++){
		var portName = "out"+i
		library.split.outports.push({"name" : portName, "type" : "all"})
	}
	library.encode = {			
			"name" : "encode",
            "description" : "encoding component",
            "icon" : "eye",
            "inports" : [
				{"name": "in", "type": "all"}
			],
            "outports" : [
				{"name": "out", "type": "all"}
            ]
	};
	return library;
}


  
/*  
function getStatus(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "http://192.168.1.140/containers/json&all=True&size=False", true);
	xhr.send();
	console.log("Envoie de la requête de récupération des status.");
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e){
		console.log("Le serveur a répondu a la requête de récupération des status.");
		console.log("State : "+xhr.readyState);
		console.log("Status : "+xhr.status);
		if ((xhr.readyState == 4) && (xhr.status == 200)) {
			var respData = JSON.parse(xhr.responseText);
			for(var key in respData){
				if (json.hasOwnProperty(key)){
					ContainerList.push(new Container(respData[key].Names, respData[key].Image, respData[key].State));
				}
			}
			for(var i in ContainerList){
				console.log(ContainerList[i].Name);
				console.log(ContainerList[i].Image);
				console.log(ContainerList[i].Status);	
			}
		}
	}
}
*/



//Génére le JSON permettant d'afficher le graph
function convertToPhotobooth(){
	var jsonRet = {};
	jsonRet.id = "swarmGraph";
	jsonRet.properties = {};
	jsonRet.properties.name = "photobooth";
	jsonRet.properties.environnement = {};
	jsonRet.properties.environnement.runtime ="html";
	jsonRet.properties.environnement.src="preview/iframe.html";
	jsonRet.properties.environnement.width=300;
	jsonRet.properties.environnement.height=300;
	jsonRet.properties.environnement.content="    <video id=\"vid\" autoplay loop width=\"640\" height=\"480\" style=\"display:none;\"></video>\n    <canvas id=\"out\" width=\"640\" height=\"480\" style=\"max-width:100%;\"></canvas>\n\n<input id=\"slider\" type=\"range\" min=\"0\" max=\"1\" value=\"0.5\" step=\"0.01\"></input>\n    <button id=\"start\">start camera</button>\n    <button id=\"prev\">prev</button>\n    <button id=\"next\">next</button>\n    <button id=\"save\">save</button>\n\n<style>\n  #saved img { width: 160px; height: 120px;}\n</style>\n<div id=\"saved\"></div>";
	jsonRet.inports = {};
	jsonRet.inports.fileToEncode = { "process" : "split", "port" : "in", "metadata" : { "x" : 0, "y" : 500 } };
	jsonRet.outports = {};
	jsonRet.outports.encodedFile = { "process" : "merge", "port" : "out", "metadata" : { "x" : 700, "y" : 500 } };
	jsonRet.groups = [];
	jsonRet.processes={};
	for(var i in containerList){
		var nomImg = containerList[i].Image;
		var nodeName = nomImg;
		jsonRet.processes[nodeName] = {};
		if(nomImg.substring(0,6)=="encode"){
			jsonRet.processes[nodeName].component="encode";
			jsonRet.processes[nodeName].metadata={};
			jsonRet.processes[nodeName].metadata.x=300; 
			jsonRet.processes[nodeName].metadata.y=100+(i*150); 
			jsonRet.processes[nodeName].metadata.label=nomImg; 	
		}
		else if(nomImg == "split"){
			jsonRet.processes[nodeName].component=nomImg;
			jsonRet.processes[nodeName].metadata={};
			jsonRet.processes[nodeName].metadata.x=100; 
			jsonRet.processes[nodeName].metadata.y=300; 
			jsonRet.processes[nodeName].metadata.label=nomImg; 	
		}
		else{//nomImg==""merge
			jsonRet.processes[nodeName].component=nomImg;
			jsonRet.processes[nodeName].metadata={};
			jsonRet.processes[nodeName].metadata.x=500; 
			jsonRet.processes[nodeName].metadata.y=300; 
			jsonRet.processes[nodeName].metadata.label=nomImg; 
		}
	}
	jsonRet.connections=[];
	
	var nbEncode = countEncodeImg();

	for(var i=0;i<nbEncode;i++){
		var jsonCurrent = {};
		jsonCurrent.src = {
			"process": "split",
			"port": "out"+i
		};
		jsonCurrent.tgt = {
			"process": "encode"+i,
			"port": "in"
		};
		jsonCurrent.metadata = {
			"route": "10"
		};

		jsonRet.connections.push(jsonCurrent);	
	}

	for(var i=0;i<nbEncode;i++){
		var jsonCurrent = {};
		jsonCurrent.src = {
			"process": "encode"+i,
			"port": "out"
		};
		jsonCurrent.tgt = {
			"process": "merge",
			"port": "in"+i
		};
		jsonCurrent.metadata = {
			"route": "9"
		};	

		jsonRet.connections.push(jsonCurrent);
	}

	return jsonRet;
}

//convertToPhotobooth(containerList);
