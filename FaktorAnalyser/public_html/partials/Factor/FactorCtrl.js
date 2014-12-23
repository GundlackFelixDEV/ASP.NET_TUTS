//Factor Controller handle all Factor changes
function FactorCtrl($scope){
    $scope.Factors = new ItemController(Factor);
    
    $scope.CountFactors = function(){
        return $scope.Factors.Count();
    };
    $scope.UpdateFactor = function(factor){
        console.log("FactorCtrl::UpdateFactor");
        $scope.Factors.Update(factor);
    };
    $scope.AddFactor = function(factor){
        console.log("FactorCtrl::AddFactor");
        $scope.Factors.Add(factor);
        $scope.NewFactor = new Factor({Description:"",Weight:1,ID:$scope.Factors.IDs.add()});
    };
    $scope.RemoveFactor = function(factor){
        console.log("FactorCtrl::RemoveFactor");
        $scope.Factors.Remove(factor);
    };
    $scope.NewFactor = new Factor({Description:"",Weight:1,ID:$scope.Factors.IDs.add()});    
};
