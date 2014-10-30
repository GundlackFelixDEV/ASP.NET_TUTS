var GPSGameController = function($scope,$injector,$timeout){
    
    $injector.invoke(PanoramioController, this, {$scope: $scope});

    $scope.GameStatus = {
        picking: false,
        finish: false,
	waiting: false,
	running: false
    };
    $scope.PickTimer = {
        Enabled: true,
        TimeOut: 15000,
        T: 15000
    };
    $scope.NewGameTimer = {
        Enabled: true,
        TimeOut: 5000,
        T: 5000
    };
   
    $scope.StartGame = function(){
        if($scope.GameStatus.running){
            return;
        }
        alert("Game starting!");
	$scope.GameStatus.picking = false;
        $scope.GameStatus.finish = false;
        $scope.GameStatus.running = true;
        
        $scope.NextPhoto();
        $scope.DisplayPhotoWidget();
        $scope.HidePhotoWidget($scope.PickTimer.TimeOut*0.3);
        $scope.StartPicking();	
    };
    
    $scope.StopGame = function(){
	$scope.GameStatus.picking = false;
        $scope.GameStatus.finish = false;
        $scope.GameStatus.running = false;
        
	$timeout.cancel($scope.PickTimer.Timer);
        $scope.PickTimer.T = $scope.PickTimer.TimeOut;    
		
	$timeout.cancel($scope.NewGameTimer.Timer);
        $scope.NewGameTimer.T = $scope.NewGameTimer.TimeOut; 
    };
    
    var CountDownPick = function(){
       $scope.PickTimer.T -= 1000;
       if($scope.PickTimer.T > 0){
        $scope.PickTimer.Timer = $timeout(CountDownPick,1000);
       }
    };
    
    var CountDownGame = function(){
       $scope.NewGameTimer.T -= 1000; 
       if($scope.NewGameTimer.T > 0){
           $scope.PickTimer.Timer = $timeout(CountDownGame,1000); 
       }
    };
    $scope.StartPicking = function(){
        if($scope.PickTimer.Enabled){
            $scope.PickTimer.Timer = $timeout(CountDownPick,1000); ;
        }
	$scope.GameStatus.picking = true;
    };
    $scope.FinishGame = function(){
        if($scope.NewGameTimer.Enabled){
            $scope.NewGameTimer.Timer = $timeout(CountDownGame,1000);
            $scope.GameStatus.running = true;
        }
        $scope.GameStatus.picking = false;
        $scope.GameStatus.finish = true;
    };
    
    $scope.$watch(function(scope) { return scope.PickTimer.T; },
              function(newValue) {
                  if(newValue === 0){
                    $scope.PickTimer.T = $scope.PickTimer.TimeOut;                        
                    $scope.FinishGame();
                  }
              });
              
    $scope.$watch(function(scope) { return scope.NewGameTimer.T; },
            function(newValue) {
                if(newValue === 0){
                    $scope.NewGameTimer.T = $scope.NewGameTimer.TimeOut;
                    $scope.StartGame();
                }
            });
};