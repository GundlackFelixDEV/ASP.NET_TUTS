function GeolocationController($scope){

    //Geolocation Model
    $scope.UserPosition = null;
    $scope.ErrorMessage = "";
    $scope.map = null;
    var nav = null;
        
    $scope.Initialize = function(){           
       console.log("InitGoogleMaps");

       var pos = new google.maps.LatLng(50,13);
       var options = {
                    zoom: 13,
                    center: pos
            };

        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), options);
        $scope.UserPosition = new Position($scope.map,pos);

        google.maps.event.addListener($scope.map, 'click', function(event){
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
    $scope.MoveToUserPosition = function()
    {
        console.log("MoveToUserPosition");
        $scope.map.panTo($scope.UserPosition.GPS);
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
                    $scope.MoveToUserPosition();                                   
                },$scope.GeolocationErrorCallback);

            } else {
                $scope.Error("Geolocation is not supported by this browser.");
            }
        }
        else {
            $scope.Error("Unable to find navigator");
        }
    };
              
    $scope.SetUserPosition = function(pos){
        console.log("SetUserPosition");
        $scope.UserPosition.setPosition(pos);              
        $scope.$apply();
    };
        
    $scope.Error = function(message){
        if(!message || message.length === 0){
            message = "Unknown Error";
        }
        console.log("GeolocationController: " + message);
        $scope.ErrorMessage = message;
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
};
