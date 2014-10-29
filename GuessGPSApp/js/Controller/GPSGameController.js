var GPSGameController = function($scope,$injector,photoController){
    
    $injector.invoke(photoController, this, {$scope: $scope});
    $scope.GameStatus = {
        picking: true,
        finish: false
    };
    $scope.PickTimer = {
        Enabled: true,
        TimeOut: 10000,
        T: 10000
    };
    $scope.NewGameTimer = {
        Enabled: true,
        TimeOut: 3000,
        T: 3000
    };
   
    $scope.StartGame = function(){
        $scope.NextPhoto();
        $scope.DisplayPhotoWidgetTemporal(3000);
        $scope.StartPicking();
    };
    
    $scope.EndGame = function(){
        
    };
    
    $scope.StartPicking = function(){
        if($scope.PickTimer.Enabled){
            $scope.PickTimer.Timer = $scope.$timeout(function(){
                                    $scope.PickTimer.T -= 500;},500,true);    
        }
        $scope.GameStatus.picking = true;
        $scope.GameStatus.finish = false;
    };
    
    $scope.FinischGame = function(){
        if($scope.NewGameTimer.Enabled){
            $scope.NewGameTimer.Timer = $scope.$timeout(function(){
                                        $scope.NewGameTimer.T -= 500;},500,true);
        }
        $scope.GameStatus.picking = false;
        $scope.GameStatus.finish = true;
    };
    
    $scope.$watch(function(scope) { return scope.PickTimer.T; },
              function(newValue) {
                  if(newValue === 0){
                    $scope.$timeout.cancel($scope.PickTimer.Timer);
                    $scope.NewGameTimer.T = $scope.PickTimer.TimeOut;                        
                    $scope.FinishGame();
                  }
              });
              
    $scope.$watch(function(scope) { return scope.NewGameTimer.T; },
            function(newValue) {
                if(newValue === 0){
                    $scope.$timeout.cancel($scope.NewGameTimer.Timer);
                    $scope.NewGameTimer.T = $scope.NewGameTimer.TimeOut;
                    $scope.StartGame();
                }
            });
};