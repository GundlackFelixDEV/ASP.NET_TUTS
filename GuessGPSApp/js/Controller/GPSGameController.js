function GPSGameController($scope,$injector,CountDownService){
    
    $injector.invoke(PanoramioController, this, {$scope: $scope});
    
    $scope.DisableAutomaticPanoramioRequests();
    $scope.HidePhotoMarker();
    $scope.GameStatus = 0;
    $scope.Rounds = 2;
    $scope.CurRound = 0;
    $scope.PickTimer = {};
    $scope.PickTimer.Options = new CountDownOpts();
    $scope.PickTimer.Options.T_Start = 15000;    
    
    $scope.NewGameTimer = {};
    $scope.NewGameTimer.Options = new CountDownOpts();
    $scope.NewGameTimer.Options.T_Start = 5000;
    
    $scope.GameRunning = function(){
        return $scope.GameStatus !== 0;
    };
    $scope.StartGame = function(){
        if($scope.GameRunning()){
            return;
        }
        if($scope.CurRound === 0){
            $scope.GetPhotosInBounds();
        }
        $scope.CurRound += 1;
        $scope.NextPhoto();
        $scope.HidePhotoMarker();
        $scope.DisplayPhotoWidget();
        $scope.HidePhotoWidget($scope.PickTimer.Options.T_Start*0.3);
        $scope.StartPicking();	
    };
    
    $scope.StopGame = function(){        
        $scope.GameStatus = 0;
        $scope.CurRound = 0;
        CountDownService.Stop();
    };
    
    $scope.StartPicking = function(){
        console.log("StartPicking");
        $scope.GameStatus = 2;
        CountDownService.Start($scope.PickTimer.Options);
    };
    $scope.FinishGame = function(){
        console.log("GameFinished");
        $scope.GameStatus = 1;
        $scope.ShowPhotoMarker();
        if($scope.CurRound < $scope.Rounds){
            CountDownService.Start($scope.NewGameTimer.Options);
        }
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