class Container{
	constructor(cName, cImage, cStatus){
		this.Name = cName;
		this.Image = cImage;
		this.Status = cStatus;
	}
}

var ContainerList = new Array();

$http({
	method: 'GET',
	url: '"/containers/json&all=True&size=False"'
}).then(function successCallback(response) {
	console.log("Containers status successfully retrieved, code :"+response.status);
	var respData = JSON.parse(response.data);
	for (var current in respData) {
		ContainerList.push(new Container(current.Names, current.Image, current.State));
	}
}

  }, function errorCallback(response) {
  	console.log("Containers status unsuccessfully retrieved, code :"+response.status);
  });