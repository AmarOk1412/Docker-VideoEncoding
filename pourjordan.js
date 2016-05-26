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

getStatus();
