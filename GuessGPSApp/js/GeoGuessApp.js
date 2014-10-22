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
		.otherwise({redirectTo:'/CurrentLocation'});
}]);

function GeoGuessController()
{
	
}