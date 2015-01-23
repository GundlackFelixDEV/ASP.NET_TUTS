/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function FactorAnalyserCtrl($scope,$injector){
    $injector.invoke(FactorCtrl, this, {$scope: $scope});
    $injector.invoke(ItemCtrl, this, {$scope: $scope});
};