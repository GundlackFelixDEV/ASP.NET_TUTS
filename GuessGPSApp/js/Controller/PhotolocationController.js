function PhotolocationController($scope,$injector){

        $injector.invoke(GeolocationController, this, {$scope: $scope});
        
	//Geolocation Model
        $scope.PhotoPosition = null;
        
        $scope.Initialize = function(){
           console.log("$Photolocation Initialize");
           $scope.PhotoPosition = new Position($scope.map,new google.maps.LatLng(50,13));
		   $scope.PhotoPosition.Marker.setIcon({
		        path: google.maps.SymbolPath.CIRCLE,
		        scale: 7,
		        fillColor: "#F00",
		        fillOpacity: 0.05,
		        strokeWeight: 0.4
		    });
        };
        
        $scope.MoveToPhotoPosition = function()
        {
            console.log("MoveToPhotoPosition");
            $scope.map.panTo($scope.PhotoPosition.GPS);
        };

        $scope.$on("PhotoPositionChanged", function (event, position) {
            console.log("GeolocationController: HandlePhotoPositionChanged");
			$scope.PhotoPosition.setPosition(position); 
        });
        
	
        $scope.SetPhotoPosition = function(position){
            console.log("SetPhotoPosition");
			$scope.PhotoPosition.setPosition(position);
            $scope.$apply();
        };
        
        $scope.Initialize();
};