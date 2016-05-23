class Container{
	constructor(cName, cImage, cStatus){
		this.Name = cName;
		this.Image = cImage;
		this.Status = cStatus;
	}
}

var ContainerList = new Array();
  
function getStatus(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "http://192.168.1.140/containers/json&all=True&size=False", true);
	xhr.send();
	console.log("Envoie de la requête de récupération des status.");
	xhr.addEventListener("readystatechange", processRequest, false);

	/*
	 * Handler de la réception de la réponse
	 */

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

function convertToPhotobooth(jsonData){
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
	jsonRet.processes=={};
		for(var i in ContainerList){
			jsonRet.processes.node+i={};
			jsonRet.processes.node+i.component="A REMPLIR"; //A remplir
			jsonRet.processes.node+i.metadata={};
			jsonRet.processes.node+i.metadata.x="100"; //A changer
			jsonRet.processes.node+i.metadata.y="100"; //A changer
			jsonRet.processes.node+i.metadata.label=ContainerList[i].Image; //A changer
		}
	jsonRet.connections=[];
}

getStatus();
