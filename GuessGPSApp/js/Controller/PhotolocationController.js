function PhotolocationController($scope,$injector){

        $injector.invoke(GeolocationController, this, {$scope: $scope});
        
	//Geolocation Model
        $scope.PhotoPosition = {};
        $scope.photo_marker = null;
        
        $scope.Initialize = function(){
           console.log("$Photolocation Initialize");
            
            $scope.photo_marker = new google.maps.Marker({
                               map: $scope.map,
                               title: 'Photo Position!',
                               icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                           });
        };
        
        $scope.MoveToPhotoPosition = function()
        {
            $scope.map.panTo($scope.convert2GooglePos($scope.PhotoPosition));
        };

        $scope.$on("PhotoPositionChanged", function (event, position) {
            console.log("GeolocationController: HandlePhotoPositionChanged");
            $scope.SetPhotoPosition({
                coords:{
                    latitude: position.lat,
                    longitude: position.lng
                }});  
        });
        
	
        $scope.SetPhotoPosition = function(position){
            console.log("SetPhotoPosition");
            $scope.PhotoPosition = position;
            $scope.photo_marker.setPosition($scope.convert2GooglePos(position));
            $scope.$apply();
        };
        
        $scope.Initialize();
};