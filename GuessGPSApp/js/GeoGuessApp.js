var GeoGuessApp = angular.module('GeoGuessApp', ['ngRoute']);

GeoGuessApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when("/CurrentLocation",{
            //controller: "GeolocationController",
            templateUrl: "js/Views/GeolocationView.html"
        })
        .when("/Panoramio",{
                controller: "PanoramioController",
                templateUrl: "js/Views/PanoramioView.html"
        })
        .when("/Game",{
                controller: "GPSGameController",
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