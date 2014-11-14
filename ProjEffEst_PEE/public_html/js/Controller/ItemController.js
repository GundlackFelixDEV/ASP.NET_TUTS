/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ItemController($scope,ItemService){
    $scope.CurrentItem = {};
    
    $scope.ApplyChanges = function(){
        ItemService.ChangeItem($scope.CurrentItem);
    };
    $scope.$on("ItemSelected",function(){
        $scope.CurrentItem = ItemService.CurrentItem;
    });
}
