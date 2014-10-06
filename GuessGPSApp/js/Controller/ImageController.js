function ImageController($scope){
	//Image Model
	$scope.Image = {
		Path: "UnknownPath",
		Position: ""
	};
	
	//Image Functions
	$scope.SetPostion = function(position){
		$scope.Image.Position = position;
	}
	
	$scope.Error = function(message){
		if(!message || message.length == 0)
		{
			message = "Unknown Error";
		}
		throw "ImageController: " + message;
	}
}