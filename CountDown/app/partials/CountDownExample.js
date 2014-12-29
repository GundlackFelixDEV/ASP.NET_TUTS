'use strict';

angular.module('myApp.CountDownExample', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/CountDownExample', {
    templateUrl: 'partials/CountDownExample.html',
    controller: 'CountDownExampleCtrl'
  });
}])
.controller('CountDownExampleCtrl', ['$scope',function($scope) {
    $scope.cntDowns = [
        {
            ID: "#TimeOut",
            obj: new CountDown(10,"#TimeOut")
        },
        {
            ID: "#StopTimer",
            obj: new CountDown(5,"#StopTimer")
        }
    ];
    $scope.cntDowns[1].obj.setCallback(function(){
        $scope.cntDowns[0].obj.stop();
        $(this).html(CountDown.Message.Finish);
    });
    $scope.cntDowns[0].obj.start();
    $scope.cntDowns[1].obj.start();
    
    $scope.StartCountDown = function(str_id){
        var item = $.grep($scope.cntDowns,function(obj){
            return obj.ID === str_id;
        })[0];
        if(item){
            item.obj.start();
        }
    };
    $scope.IsActive = function(str_id){
        return $scope.cntDown.myStatus === CountDown.Status.Active;
    };
}]);