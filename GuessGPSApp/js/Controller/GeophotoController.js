function GeophotoController($scope,$injector){

        $injector.invoke(GeolocationController, this, {$scope: $scope});
        //Geophoto Model
        $scope.Geophoto = {
            Position: null,
            UserDistance: 0,            
            MoveToPosition: function(){
                console.log("Geophoto: MoveToPosition");
                $scope.Geolocation.map.panTo($scope.Geophoto.Position.GPS);
            },
            SetPosition: function(position){
                console.log("Geophoto: SetPosition");
                $scope.Geophoto.Position.setPosition(position);
            },
            HideMarker: function(){
                $scope.Geophoto.Position.hideMarker();
            },
            ShowMarker: function (){
                $scope.Geophoto.Position.Marker.showMarker();
            },
            UpdateDistanceToUser: function(){
                console.log("Geophoto: UpdateDistanceToUser");
                $scope.Geophoto.UserDistance = $scope.Geophoto.Position.getDisstance($scope.Geolocation.Position);
            }
        };
        
        this.initialize = function(){
            console.log("Geophoto: Initialize");
            $scope.Geophoto.Position = new Position($scope.Geolocation.map);
            $scope.Geophoto.Position.Marker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#F00",
                fillOpacity: 0.5,
                strokeWeight: 0.4
            });
        };
        this.initialize();
        
        $scope.$on("PhotoChanged", function() {
            console.log("Geophoto.on: PhotoChanged")
            $scope.Geophoto.UpdateDistanceToUser();
        });
};
GeophotoController.$inject = ['$scope','$injector'];