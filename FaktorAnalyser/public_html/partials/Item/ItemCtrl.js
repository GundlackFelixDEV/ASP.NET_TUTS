function ItemCtrl($scope){
    $scope.Items = new ItemController(Item);
    $scope.GetNewItem = function(){
        return new Item({Description:"",Factors:new Array(),ID:$scope.Items.IDs.add()});
    };
    $scope.CountItems = function(){
        return $scope.Items.Count();
    };
    $scope.UpdateItem = function(factor){
        console.log("ItemCtrl::CountItem");
        $scope.Items.Update(factor);
    };
    $scope.AddItem = function(factor){
        console.log("ItemCtrl::AddItem");
        $scope.Items.Add(factor);
        $scope.NewItem = $scope.GetNewItem();
    };
    $scope.RemoveItem= function(factor){
        console.log("ItemCtrl::RemoveItem");
        $scope.Items.Remove(factor);
    };

    $scope.NewItem = $scope.GetNewItem();
};

