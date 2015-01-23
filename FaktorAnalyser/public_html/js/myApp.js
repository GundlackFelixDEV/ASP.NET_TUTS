/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var myApp = angular.module("myApp",[])
.factory('FactorService',function($rootScope){
    var aService = {};
    aService.FactorChanged = function(param){
        console.log("FactorService:FactorChanged");
        aService.Factor = param.Factor;
        $rootScope.$broadcast(param.Event,param.Factor);                
    };
    return aService;
});

FactorCtrl.$inject = ['$scope', 'FactorService'];