/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CountDown($scope,CountDownService){
    $scope.CountDown = {
            ID: "#TimeOut",
            obj: new CountDown(10,"#TimeOut")
        };
        
    $scope.$on("Start",function(){
        console.log("CountDown.on: Start");
        $scope.CountDown.SetOptions(CountDownService.options);
        $scope.CountDown.Start();
    });
    $scope.$on("Stop",function(){
        console.log("CountDown.on: Stop");
        $scope.CountDown.Stop();
    });
    $scope.$on("Pause",function(){
        console.log("CountDown.on: Pause");
        $scope.CountDown.Pause();
    });
    /*
    $scope.$watch(function(scope){return scope.CountDown.T;},function(newValue){
        if(newValue)
            console.log("CountDown: " + newValue);
        
        if(newValue === $scope.CountDown.Options.T_Stop){
            CountDownService.CountDownEnd();
        }else if(newValue <= 5000){
            $("#CountDownDisplay").css({fontSize:"2em"}).animate({fontSize: "3.5em"}, 500).delay(500).css({fontSize:"2em"});
        }
    });
    $scope.CountDown.IsRunning = function(){
            return (this.Status === "Start");
    };*/
};
CountDown.$inject = ['$scope','$timeout','CountDownService'];
