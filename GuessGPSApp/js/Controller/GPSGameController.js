function GPSGameController($scope,$injector,CountDownService){
    
    $injector.invoke(PanoramioController, this, {$scope: $scope});
    
    $scope.GameStatus = 0;
    $scope.Rounds = 2;
    $scope.CurRound = 0;
    $scope.PickTimer = {};
    $scope.PickTimer.Options = new CountDownOpts();
    $scope.PickTimer.Options.T_Start = 15000;    
    
    $scope.NewGameTimer = {};
    $scope.NewGameTimer.Options = new CountDownOpts();
    $scope.NewGameTimer.Options.T_Start = 5000;
    
    $scope.StartGame = function(){
        if($scope.GameStatus > 0){
            return;
        }
        $scope.CurRound += 1;
        $scope.NextPhoto();
        $scope.DisplayPhotoWidget();
        $scope.HidePhotoWidget($scope.PickTimer.Options.T_Start*0.3);
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
        if($scope.CurRound < $scope.Rounds){
            CountDownService.Start($scope.NewGameTimer.Options);
        }
        $scope.GameStatus = 1;
    };
    
    $scope.$on("CountDownEnd",function(){
        console.log("HandleCountDownEnd");
        switch($scope.GameStatus){
            case 1: //NewGameWaiting Ended
               $scope.StartGame();
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