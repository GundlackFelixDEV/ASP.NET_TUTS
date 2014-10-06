GeoGuessApp.controller('GeolocationController',function($scope){

	//Geolocation Model
	$scope.Position = {
		Geolocation: {},
		Latitude: 0,
		Longitude: 1000
	};
	$scope.ErrorMessage = "";
	
	//Geolocation Functions
	var nav = null;
	$scope.GetCurrentPosition = function(){
		if(nav == null){
			nav = window.navigator;
		}
		if(nav != null){
			if(nav.geolocation){
				nav.geolocation.getCurrentPosition($scope.SetPosition,$scope.GeolocationErrorCallback);
			} else {
				$scope.Error("Geolocation is not supported by this browser.");
			}
		}
		else {
			$scope.Error("Unable to find navigator");
		}
	};
	
	$scope.SetPosition = function(position,event){
		console.log("setting position:" + position);
		$scope.Position.Geolocation = position;
		$scope.Position.Latitude = position.coords.latitude;
		$scope.Position.Longitude = position.coords.longitude;
		$scope.$apply();
	};
	
	$scope.Error = function(message){
		if(!message || message.length == 0){
			message = "Unknown Error";
		}
		console.log("GeolocationController: " + message);
		$scope.ErrorMessage = message;
		$scope.$apply();
	};
	
	$scope.GeolocationErrorCallback = function(error){
		var message = "";   
	    // Check for known errors
	    switch (error.code) {
	        case error.PERMISSION_DENIED:
	            message = "This website does not have permission to use " + 
	                      "the Geolocation API";
	            break;
	        case error.POSITION_UNAVAILABLE:
	            message = "The current position could not be determined.";
	            break;
	        case error.PERMISSION_DENIED_TIMEOUT:
	            message = "The current position could not be determined " + 
	                      "within the specified timeout period.";            
	            break;
	    }
	    // If it's an unknown error, build a message that includes 
	    // information that helps identify the situation, so that 
	    // the error handler can be updated.
	    if (message == "")
	    {
	        var strErrorCode = error.code.toString();
	        message = "The position could not be determined due to " + 
	                  "an unknown error (Code: " + strErrorCode + ").";
	    }
		$scope.Error(message);
	};
});