/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var myApp = angular.module("myApp",["ngRoute"]);
myApp.config(["$routeProvider",function($routeProvider){
    $routeProvider.
        when('/Factors', {
            templateUrl: 'partials/Factor/FactorView.html',
            controller: 'FactorCtrl'
        }).
        when('/Items', {
            templateUrl: 'partials/Item/ItemView.html',
            controller: 'ItemCtrl'
        }).
        when('/FactorAnalyser', {
            templateUrl: 'partials/FactorAnalyser/FactorAnalyserView.html',
            controller: 'FactorAnalyserCtrl'
        }).
        otherwise({
            redirectTo: '/FactorAnalyser'
        });        
}]);