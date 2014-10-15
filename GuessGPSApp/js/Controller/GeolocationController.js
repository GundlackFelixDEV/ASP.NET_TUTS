GeoGuessApp.controller('GeolocationController',function($scope){

	//Geolocation Model
	$scope.UserPosition = {};
        $scope.PhotoPosition = {}
	$scope.ErrorMessage = "";
	var map = null;
        var photo_marker = null;
        var user_marker = null;
        var nav = null;
        
        $scope.Initialize = function(){           
           console.log("InitGoogleMaps");

           var pos = new google.maps.LatLng(50,13);
           var options = {
                zoom: 13,
                center: pos
            };
           
            map = new google.maps.Map(document.getElementById('map-canvas'), options);
            
            photo_marker = new google.maps.Marker({
                map: map,
                title: 'Photo Position!',
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });
            user_marker = new google.maps.Marker({
                map: map,
                title: 'Current Position!'
            });
        
            user_marker.setPosition(pos);
            
            google.maps.event.addListener(map, 'click', function(event){
                $scope.HandleMapClick(event.latLng);
            });
        };
        
        $scope.HandleMapClick = function(location){
            console.log("HandleMapClick");
            var pos = { coords: {
                    latitude: location.lat(),
                    longitude: location.lng()}};
            $scope.SetUserPosition(pos);
        };
        $scope.MoveToImagePosition = function()
        {
            map.panTo($scope.convert2GooglePos($scope.PhotoPosition));
        };
    	//Geolocation Functions  
	$scope.SetCurrentPosition = function(){     
                console.log("SetCurrentPosition");
		if(nav === null){
			nav = window.navigator;
		}
		if(nav !== null){
			if(nav.geolocation){
				nav.geolocation.getCurrentPosition(function(location){
                                    $scope.SetUserPosition(location);    
                                    map.panTo($scope.convert2GooglePos(location));
                                },$scope.GeolocationErrorCallback);
                                
                        } else {
				$scope.Error("Geolocation is not supported by this browser.");
			}
		}
		else {
			$scope.Error("Unable to find navigator");
		}
	};
	$scope.convert2GooglePos = function(position){
            return new google.maps.LatLng(position.coords.latitude,position.coords.longitude); 
        };
        
        $scope.$on("PhotoPositionChanged", function (event, position) {
            console.log("GeolocationController: HandlePhotoPositionChanged");
            $scope.SetPhotoPosition({
                coords:{
                    latitude: position.lat,
                    longitude: position.lng
                }});  
        });
        
	$scope.SetUserPosition = function(position){
		console.log("SetUserPosition");
		$scope.UserPosition = position;
                user_marker.setPosition($scope.convert2GooglePos(position));               
                $scope.$apply();
	};
	
        $scope.SetPhotoPosition = function(position){
            console.log("SetPhotoPosition");
            $scope.PhotoPosition = position;
            photo_marker.setPosition($scope.convert2GooglePos(position));
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
	    if (message === "")
	    {
	        var strErrorCode = error.code.toString();
	        message = "The position could not be determined due to " + 
	                  "an unknown error (Code: " + strErrorCode + ").";
	    }
            $scope.Error(message);
	};
	
    console.log('$GeolocationController init');
	$scope.Initialize();
	$scope.SetCurrentPosition();
});