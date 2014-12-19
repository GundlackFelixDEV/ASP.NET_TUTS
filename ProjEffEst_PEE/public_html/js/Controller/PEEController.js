/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function PEEController($scope,ItemService){
    var idCnt = 0;
    $scope.PEE.Items = [];
    $scope.PEE.CurrentItem = {};
    
    $scope.AddItem = function(item){
        item.id = idCnt + 1;
        $scope.Items.push(item);
    };    
    $scope.RemoveItem = function(id){
       var itm = this.GetItem(id);
       $scope.Items[itm.index] = [];
       if($scope.CurrentItem.id === id){
           $scope.CurrentItem = {};
       }
       if(idCnt === id){
           idCnt = idCnt -1;
       };
       
    };    
    $scope.SelectItem = function(id)
    {
        $scope.CurrentItem = this.GetItem(id);
    };    
    this.GetItem = function(id){
        for(var i = 0; i < $scope.Items.length; ++i){
           if($scope.Items[i].id === id){
               return{
                 item: $scope.Items[i],
                 index: i
               };
           }
        }
        return {item:null,index:-1};
    };    
    $scope.$on("ItemSelcted",function(){
       $scope.SelectItem(ItemService.CurrentItem.id);
    });
    $scope.$on("ItemDelete",function(){
        $scope.RemoveItem(ItemService.CurrentItem);
    });
    $scope.$on("ItemNew",function(){
        $scope.AddItem(ItemService.CurrentItem);
    });
}
