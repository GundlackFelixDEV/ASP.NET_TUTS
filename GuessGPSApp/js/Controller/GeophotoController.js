function GeophotoController($scope,$injector,PhotoService){

        $injector.invoke(GeolocationController, this, {$scope: $scope});
        //Geophoto Model
        $scope.Geophoto = {
            Position: new Position(),
            UserDistance: 0,            
            MoveToPosition: function(){
                console.log("MoveToPhotoPosition");
                $scope.Geolocation.map.panTo($scope.PhotoPosition.GPS);
            },
            SetPosition: function(position){
                console.log("SetPhotoPosition");
                $scope.Geophoto.Position.setPosition(position);
            },
            HideMarker: function(){
                $scope.Geophoto.Position.hideMarker();
            },
            ShowMarker: function (){
                $scope.Geophoto.Position.Marker.showMarker();
            },
            UpdateDistanceToUser: function(){
                console.log("Photolocation: UpdateDistanceToUser");
                $scope.Geophoto.DistanceToUser = $scope.Geophoto.Position.getDisstance($scope.Geolocation.Position);
            }
        };
        
        this.initialize = function(){
            console.log("Photolocation: Initialize");
            $scope.Geophoto.Position = new Position($scope.Geolocation.map,new google.maps.LatLng(50,13));
            $scope.Geophoto.Position.Marker.setIcon({
                 path: google.maps.SymbolPath.CIRCLE,
                 scale: 7,
                 fillColor: "#F00",
                 fillOpacity: 0.5,
                 strokeWeight: 0.4
             });
             
             $scope.$watch("[Geolocation.Position.GPS.lat]", function(newValue, oldValue) {
                $scope.Geophoto.UpdateDistanceToUser();
            },true);

            $scope.$watch("[Geophoto.Position.GPS.lat]", function(newValue, oldValue) {
                $scope.Geophoto.UpdateDistanceToUser();
            },true);
        };
        this.initialize();			
};
GeophotoController.$inject = ['$scope','$injector','PhotoService'];