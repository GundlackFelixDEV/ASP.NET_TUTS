function GPSGameController($scope,$injector,CountDownService){
    
    $injector.invoke(PanoramioController, this, {$scope: $scope});
    
    $scope.GameStatus = 0;
    
    $scope.PickTimer = {};
    $scope.PickTimer.Options = new CountDownOpts();
    $scope.PickTimer.Options.T_Start = 15000;    
    
    $scope.NewGameTimer = {};
    $scope.NewGameTimer.Options = new CountDownOpts();
    $scope.NewGameTimer.Options.T_Start = 5000;
    
    $scope.StartGame = function(){
        if($scope.GameStatus.running){
            return;
        }  
        $scope.NextPhoto();
        $scope.DisplayPhotoWidget();
        $scope.HidePhotoWidget($scope.PickTimer.TimeOut*0.3);
        $scope.StartPicking();	
    };
    
    $scope.StopGame = function(){
        CountDownService.Stop();
        $scope.GameStatus = 0;
        CountDownService.Stop();
    };
    
    $scope.StartPicking = function(){
        console.log("StartPicking");
        $scope.GameStatus = 2;
        CountDownService.Start($scope.PickTimer.Options);
    };
    $scope.FinishGame = function(){
        console.log("GameFinished");
        CountDownService.Start($scope.NewGameTimer.Options);
        $scope.GameStatus = 1;
    };
    
    $scope.$on("CountDownEnd",function(){
        console.log("HandleCountDownEnd");
        switch($scope.GameStatus){
            case 1: //NewGameWaiting Ended
               $scope.StartPicking();
               return;
            case 2: //Picking Ended
                $scope.FinishGame();
                return;
            default:
                console.log("Unknown GameStatus: " + $scope.GameStatus);
                break;
        };
    });
};