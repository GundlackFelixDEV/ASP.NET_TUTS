/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CountDown($scope,$timeout,CountDownService){
    $scope.Start= function(){
        this.Timer = $timeout(CountDown,Math.abs($scope.Options.delta),true);
    };
    $scope.Stop = function(){
        this.Pause();
        $scope.T = $scope.Options.T_Start;
    };
    $scope.Pause = function(){
        if(this.Timer){
            $timeout.cancel(this.Timer);
        } 
    };
    var CountDown = function(){
       var opt = $scope.Options;
       if((opt.delta > 0 && $scope.T < opt.T_Stop) ||
            (opt.delta < 0 && $scope.T > opt.T_Stop)){
                $scope.T += opt.delta;
                this.Timer = $timeout(CountDown,Math.abs(opt.delta),true); 
            }
    };
    $scope.SetOptions = function(opt){
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
        $scope.SetOptions(CountDownService.options);
        $scope.Start();
    });
    $scope.$on("Stop",$scope.Stop);
    $scope.$on("Pause",$scope.Pause);
    $scope.$watch(function(scope){return scope.T;},function(newValue){
        console.log(newValue);
        if(newValue === $scope.Options.T_Stop){
            CountDownService.CountDownEnd();
        }
    });
    this.Timer = null;
    $scope.SetOptions($scope.Options);
};

function CountDownOpts(){
    this.T_Start = 10000;
    this.T_Stop = 0;
    this.delta =  -1000;
    this.loop =  false;
};
