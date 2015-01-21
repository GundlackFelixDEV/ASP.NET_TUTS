var GeoGuessApp = angular.module('GeoGuessApp', ['ngRoute'])
.config(['$routeProvider',function($routeProvider){
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
}])
.factory("CountDownService",function($rootScope){
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
