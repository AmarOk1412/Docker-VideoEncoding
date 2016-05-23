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
	console.log("Envoie de la requ�te de r�cup�ration des status.");
	xhr.addEventListener("readystatechange", processRequest, false);

	/*
	 * Handler de la r�ception de la r�ponse
	 */

	function processRequest(e){
		console.log("Le serveur a r�pondu a la requ�te de r�cup�ration des status.");
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