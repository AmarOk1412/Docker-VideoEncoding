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
	xhr.open('GET', "/containers/json&all=True&size=False", true);
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
		}
	}
}