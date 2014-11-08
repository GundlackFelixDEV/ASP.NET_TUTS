GeolocationController = function($scope){
     var nav = null;  
     //Geolocation Model
    $scope.Geolocation = {
        Position: null,
        map: null,
        Options: {
            zoom: 12,
            mapTypeControl: false
        },
        //Geolocation functions
        GetBounds: function(){
            return $scope.Geolocation.map.getBounds();
        },
        HandleMapClick: function(location){
            console.log("Geolocation: HandleMapClick");
            var pos = { coords: {
                            latitude: location.lat(),
                            longitude: location.lng()}};
            $scope.Geolocation.SetPosition(pos);
        },
        MoveToPosition: function(){
            console.log("Geolocation: MoveToPosition");
            $scope.Geolocation.map.panTo($scope.Geolocation.Position.GPS);
        },
        SetCurrentPosition: function(){     
            console.log("Geolocation: SetCurrentPosition");
            if(nav === null){
                nav = window.navigator;
            }
            if(nav !== null){
                if(nav.geolocation){
                    nav.geolocation.getCurrentPosition(function(location){
                        $scope.Geolocation.SetPosition(location);  
                        $scope.Geolocation.MoveToPosition();                                   
                    },this.GeolocationErrorCallback);

                } else {
                    GeolocationController.Error("Geolocation is not supported by this browser.");
                }
            }
            else {
                GeolocationController.Error("Unable to find navigator");
            }
        },
        SetPosition: function(pos){
            console.log("Geolocation: SetPosition");
            $scope.Geolocation.Position.setPosition(pos);              
            $scope.$apply();
        }
    }; 
    this.initialize = function(){           
       console.log("Geolocation: Initialize");
       $scope.Geolocation.map = new google.maps.Map(document.getElementById('map-canvas'), $scope.Geolocation.options);

        google.maps.event.addListener($scope.Geolocation.map, 'click', function(event){
                $scope.Geolocation.HandleMapClick(event.latLng);
        });
        $scope.Geolocation.Position = new Position($scope.Geolocation.map);
        $scope.Geolocation.SetCurrentPosition();
    };

    this.Error = function(message){
        if(!message || message.length === 0){
            message = "Unknown Error";
        }
        console.log("Geolocation Error: " + message);
    };
	
    this.GeolocationErrorCallback = function(error){
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
        this.Error(message);
    };
    this.initialize();
};
