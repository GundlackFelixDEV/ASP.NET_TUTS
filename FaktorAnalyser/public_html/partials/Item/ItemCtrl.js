function ItemCtrl($scope){
    $scope.Items = new ItemController(Item);
    $scope.GetNewItem = function(){
        return new Item({Description:"",ID:$scope.Items.IDs.add()});
    };
    $scope.CountItems = function(){
        return $scope.Items.Count();
    };
    $scope.UpdateItem = function(obj){
        console.log("ItemCtrl::CountItem");
        $scope.Items.Update(obj);
    };
    $scope.AddItem = function(obj){
        console.log("ItemCtrl::AddItem");
        $scope.Items.Add(obj);
        $scope.NewItem = $scope.GetNewItem();
    };
    $scope.RemoveItem= function(obj){
        console.log("ItemCtrl::RemoveItem");
        $scope.Items.Remove(obj);
    };
    
    $scope.$on('FactorAdd', function(ev,factor){
        console.log("ItemCtrl::on::FactorAdd");
        $.each($scope.Items,function(){
            this.setValue(factor.ID,1);
        });
    });
    $scope.$on('FactorRemove', function(ev,factor){
        console.log("ItemCtrl::on::FactorRemove");
    });
    $scope.$on('FactorUpdate', function(ev,factor){
        console.log("ItemCtrl::on::FactorUpdate");
    });
    $scope.NewItem = $scope.GetNewItem();
};
