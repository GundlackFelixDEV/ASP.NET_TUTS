'use strict';

angular.module('myApp.CountDownExample', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/CountDownExample', {
    templateUrl: 'view1/CountDownExample.html',
    controller: 'CountDownExampleCtrl'
  });
}])

.controller('CountDownExampleCtrl', [function() {

}]);