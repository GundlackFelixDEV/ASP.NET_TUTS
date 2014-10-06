var GeoGuessApp = angular.module('GeoGuessApp', ['ngRoute']);

GeoGuessApp.config(['$routeProvider',function($routeProvider){

    console.log('$routeProvider init');
    
	$routeProvider
		.when("/CurrentLocation",{
            controller: "GeolocationController",
            templateUrl: "js/Views/GeolocationView.html"
        })
		.otherwise({redirectTo:'/CurrentLocation'});
}]);