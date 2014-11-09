var GeoGuessApp = angular.module('GeoGuessApp', ['ngRoute']);

GeoGuessApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
            .when("/CurrentLocation",{
            templateUrl: "js/Views/GeolocationView.html"
        })
        .when("/Panoramio",{
            templateUrl: "js/Views/PanoramioView.html"
        })
        .when("/Game",{
            templateUrl: "js/Views/GPSGameView.html"
        })
        .otherwise({redirectTo:'/CurrentLocation'});
}]);

GeoGuessApp.factory("CountDownService",function($rootScope){
   var CountDownService = {};
   CountDownService.options = {};
   CountDownService.CountDownEnd = function(){
        $rootScope.$broadcast('CountDownEnd');
   };
   CountDownService.Start = function(options){
     console.log("CountDownService.Broadcast: Start");
     CountDownService.options = options;
     $rootScope.$broadcast('Start');
   };
   CountDownService.Stop = function(){
     console.log("CountDownService.Broadcast: Stop");
     $rootScope.$broadcast('Stop');
   };
   CountDownService.Pause = function(){
     console.log("CountDownService.Broadcast: Pause");
     $rootScope.$broadcast('Pause');
   };
   return CountDownService;
});


CountDown.$inject = ['$scope','$timeout','CountDownService'];
GPSGameController.$inject = ['$scope','$injector','CountDownService'];

GeoGuessApp.factory("PhotoService",function($rootScope){
   var PhotoService = {
       Position: new google.maps.LatLng(),
       PhotoChanged: function(img){
           console.log("PhotoService.Broadcast: PhotoChanged");
           $rootScope.broadcast('PhotoChanged');
       }
   };
   
   return PhotoService;
});

GeophotoController.$inject = ['$scope','$injector','PhotoService'];
PanoramioController.$inject = ['$scope','$timeout','PhotoService'];
