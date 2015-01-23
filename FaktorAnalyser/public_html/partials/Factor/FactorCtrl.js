//Factor Controller handle all Factor changes
function FactorCtrl($scope,FactorService){
    $scope.Factors = new ItemController(Factor);    
    $scope.GetNewFactor = function(){
        return new Factor({Description:"",ID:$scope.Factors.IDs.add()});
    };    
    $scope.CountFactors = function(){
        return $scope.Factors.Count();
    };
    $scope.UpdateFactor = function(factor){
        console.log("FactorCtrl::UpdateFactor");
        $scope.Factors.Update(factor);
        FactorService.FactorChanged({Factor:factor,Event:'FactorUpdate'});
    };
    $scope.AddFactor = function(factor){
        console.log("FactorCtrl::AddFactor");
        $scope.Factors.Add(factor);
        $scope.NewFactor = $scope.GetNewFactor();
        FactorService.FactorChanged({Factor:factor,Event:'FactorAdd'});
    };
    $scope.RemoveFactor = function(factor){
        console.log("FactorCtrl::RemoveFactor");
        $scope.Factors.Remove(factor);
        FactorService.FactorChanged({Factor:factor,Event:'FactorRemove'});
    };
    $scope.NewFactor = $scope.GetNewFactor();    
};

