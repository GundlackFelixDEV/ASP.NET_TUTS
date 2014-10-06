GeoGuessApp.controller('GeolocationController',function($scope){

	//Geolocation Model
	$scope.Position = {};
	$scope.ErrorMessage = "";
	var map = null;
        var marker = null;
        $scope.MapsOption = {
            zoom: 13
        };
        
        $scope.InitGoogleMaps = function(position){           
           console.log("InitGoogleMaps");
           if(!position.coords)
           {
               $scope.Error("Unable to initialize google maps widget. Position unknown");
               return;
           }
           var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
           var options = $scope.MapsOption;
           options.center = pos;
           
           if(map === null){
               map = new google.maps.Map(document.getElementById('map-canvas'), options);
           }
           
           if(marker === null){
            marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Current Position!'
            }); 
           }              
            
           google.maps.event.addListener(map, 'click', function(event){
               $scope.HandleMapClick(event.latLng);
           });
        };
        $scope.HandleMapClick = function(location){
            console.log("HandleMapClick");
            var pos = { coords: {
                    latitude: location.lat(),
                    longitude: location.lng()}};
            $scope.SetPosition(pos);
        };
            
    	//Geolocation Functions
	var nav = null;  
	$scope.GetCurrentPosition = function(){                
		if(nav === null){
			nav = window.navigator;
		}
		if(nav !== null){
			if(nav.geolocation){
				nav.geolocation.getCurrentPosition(function(pos){
                                    $scope.SetPosition(pos);
                                },$scope.GeolocationErrorCallback);
                                
                        } else {
				$scope.Error("Geolocation is not supported by this browser.");
			}
		}
		else {
			$scope.Error("Unable to find navigator");
		}
                return null;
	};
	
	$scope.SetPosition = function(position){
		console.log("setting position:" + position);
		$scope.Position = position;
                if(map === null){
                    $scope.InitGoogleMaps(position);
                }
                marker.setPosition(new google.maps.LatLng(position.coords.longitude,position.coords.latitude)); 
		$scope.$apply();
	};
	
	$scope.Error = function(message){
		if(!message || message.length === 0){
			message = "Unknown Error";
		}
		console.log("GeolocationController: " + message);
		$scope.ErrorMessage = message;
		//$scope.$apply();
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
        
        google.maps.event.addDomListener(window, 'load', $scope.GetCurrentPosition());
});