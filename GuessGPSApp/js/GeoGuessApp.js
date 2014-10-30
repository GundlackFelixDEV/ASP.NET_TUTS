var GeoGuessApp = angular.module('GeoGuessApp', ['ngRoute']);

GeoGuessApp.config(['$routeProvider',function($routeProvider){

    console.log('$App init');
    
	$routeProvider
		.when("/CurrentLocation",{
            controller: "GeolocationController",
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