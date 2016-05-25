class Container{
	constructor(cName, cImage, cStatus){
		this.Name = cName;
		this.Image = cImage;
		this.Status = cStatus;
	}
}

function countEncodeImg(){
	nbEncode = 0;
	for(var i in containerList){
		if(containerList[i].Image.substring(0,6)=="encode"){
			nbEncode++;
		}
	return nbEncode;
}

function loadLibrary(){
	var library={};
	var nbEncode = countEncodeImg();
	library.mergeComp = {
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
			library.mergeComp.inports.push({"name" : portName, "type" : "all"})
	}
	library.splitComp = {			
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
		library.splitComp.outports.push({"name" : portName, "type" : "all"})
	}
	library.encodeComp = {			
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

var containerList = new Array();
  
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

var ct1 = new Container("Nom1","split","exited");
var ct2 = new Container("Nom2","encode0","running");
var ct3 = new Container("Nom3","encode1","running");
var ct4 = new Container("Nom3","merge","running");
containerList.push(ct1);
containerList.push(ct2);
containerList.push(ct3);
containerList.push(ct4);



//Génére le JSON permettant d'afficher le graph
function convertToPhotobooth(){
	console.log("Je suis bien dans la convertToPhotobooth")
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
	jsonRet.inports.prev = { "process" : "fileToEncode", "port" : "prev", "metadata" : { "x" : 0, "y" : 144 } };
	jsonRet.outports = {};
	jsonRet.outports.image = { "process" : "encodedFile", "port" : "out", "metadata" : { "x" : 2000, "y" : 1000 } };
	jsonRet.groups = [];
	jsonRet.processes={};
	for(var i in containerList){
		var nomImg = containerList[i].Image;
		var nodeName = nomImg;
		jsonRet.processes[nodeName] = {};
		if(nomImg.substring(0,6)=="encode"){
			jsonRet.processes[nodeName].component="encode";	
		}
		else{
			jsonRet.processes[nodeName].component=nomImg;
	
		}
		jsonRet.processes[nodeName].metadata={};
		jsonRet.processes[nodeName].metadata.x=100+(i*100); //A changer
		jsonRet.processes[nodeName].metadata.y=100+(i*100); //A changer
		jsonRet.processes[nodeName].metadata.label=nomImg; //A changer
	}
	jsonRet.connections=[];
	
	var nbEncode = countEncodeImg();

	for(var i=0;i<nbEncode;i++){
		var jsonCurrent = {};
		jsonCurrent.src = {
			"processes": "split",
			"port": "out"
		};
		jsonCurrent.tgt = {
			"processes": "encode"+i,
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
			"processes": "encode"+i,
			"port": "out"
		};
		jsonCurrent.tgt = {
			"processes": "merge",
			"port": "in"
		};
		jsonCurrent.metadata = {
			"route": "9"
		};	

		jsonRet.connections.push(jsonCurrent);
	}
		
	console.log(JSON.stringify(jsonRet));
	return jsonRet;
}

//convertToPhotobooth(containerList);