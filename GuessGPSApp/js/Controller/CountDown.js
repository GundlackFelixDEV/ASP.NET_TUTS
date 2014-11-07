/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CountDown($scope,$timeout,CountDownService){
    $scope.Start= function(){
        console.log("CountDown.Start");
        if(!$scope.IsRunning()){
              $scope.Timer = $timeout(CountDown,Math.abs($scope.Options.delta),true);
              this.Status = "Start";
        }
    };
    $scope.Stop = function(){
        console.log("CountDown.Stop");
        $scope.Pause();
	this.Status = "Stop";
        $scope.T = $scope.Options.T_Start;

    };
    $scope.Pause = function(){
        console.log("CountDown.Pause");
        $timeout.cancel(this.Timer);
        $scope.Timer = null;
        this.Status = "Pause";
    };
    var CountDown = function(){
       var opt = $scope.Options;
       if((opt.delta > 0 && $scope.T < opt.T_Stop) ||
            (opt.delta < 0 && $scope.T > opt.T_Stop)){
                $scope.T += opt.delta;
                $scope.Timer = $timeout(CountDown,Math.abs(opt.delta),true);
            }
    };
    $scope.SetOptions = function(opt){
        console.log("CountDown.SetOptions");
        $scope.Pause();
        if(opt instanceof CountDownOpts)
        {
            $scope.Options = opt;
        }else{
            console.error("CountDown.SetOptions unrecogniced option format. Standard initialization of CountDownOpts will be used!");
            $scope.Options = new CountDownOpts();
        } 
        $scope.T = $scope.Options.T_Start;
    };
    $scope.$on("Start",function(){
        console.log("CountDown.on: Start");
        $scope.SetOptions(CountDownService.options);
        $scope.Start();
    });
    $scope.$on("Stop",function(){
        console.log("CountDown.on: Stop");
        $scope.Stop();
    });
    $scope.$on("Pause",function(){
        console.log("CountDown.on: Pause");
        $scope.Pause();
    });
    $scope.$watch(function(scope){return scope.T;},function(newValue){
        console.log(newValue);
        if(newValue === $scope.Options.T_Stop){
            CountDownService.CountDownEnd();
        }else if(newValue <= 5000){
            $("#CountDownDisplay").css({fontSize:"2em"}).animate({fontSize: "3.5em"}, 500).delay(500).css({fontSize:"2em"});
        }
    });	
    $scope.IsRunning = function(){
            return (this.Status === "Start");
    };
    this.Continue = false;
    $scope.Timer = null;
    this.Status = "Stop";
    $scope.SetOptions($scope.Options);

};

function CountDownOpts(){
    this.T_Start = 10000;
    this.T_Stop = 0;
    this.delta =  -1000;
    this.loop =  false;
};
