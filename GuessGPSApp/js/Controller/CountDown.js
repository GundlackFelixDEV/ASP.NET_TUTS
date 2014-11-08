/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CountDown($scope,$timeout,CountDownService){
    this.Continue = false;
    this.Status = "Stop";
    $scope.CountDown = {
        Timer: null,
        Options: new CountDownOpts(),
        T: CountDownOpts.T_Start,
        Start:  function(){
                console.log("CountDown.Start");
                if(!$scope.CountDown.IsRunning()){
                      $scope.Timer = $timeout(CountDown,Math.abs($scope.CountDown.Options.delta),true);
                      this.Status = "Start";
                }
        },
        Stop: function(){
            console.log("CountDown.Stop");
            $scope.CountDown.Pause();
            this.Status = "Stop";
            $scope.T = $scope.CountDown.Options.T_Start;
        },
        Pause: function(){
            console.log("CountDown.Pause");
            $timeout.cancel(this.Timer);
            $scope.CountDown.Timer = null;
            this.Status = "Pause";
        }
    };
    var CountDown = function(){
       var opt = $scope.CountDown.Options;
       if((opt.delta > 0 && $scope.CountDown.T < opt.T_Stop) ||
            (opt.delta < 0 && $scope.CountDown.T > opt.T_Stop)){
                $scope.CountDown.T += opt.delta;
                $scope.CountDown.Timer = $timeout(CountDown,Math.abs(opt.delta),true);
            }
    };
    $scope.CountDown.SetOptions = function(opt){
        console.log("CountDown.SetOptions");
        $scope.CountDown.Pause();
        if(opt instanceof CountDownOpts)
        {
            $scope.CountDown.Options = opt;
        }else{
            console.error("CountDown.SetOptions unrecogniced option format. Standard initialization of CountDownOpts will be used!");
            $scope.CountDown.Options = new CountDownOpts();
        } 
        $scope.CountDown.T = $scope.CountDown.Options.T_Start;
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
    };
};

function CountDownOpts(){
    this.T_Start = 10000;
    this.T_Stop = 0;
    this.delta =  -1000;
    this.loop =  false;
};
