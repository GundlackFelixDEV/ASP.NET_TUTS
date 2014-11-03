/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var CountDownController = function($scope,$timeout){
    this.CountDown = function(){
       $scope.T -= $scope.Options.delta;
       if($scope.T !== this.Options.T_Stop){
           this.Timer = $timeout(this.CountDown(),this.Options.delta); 
       }
    };
    this.Start = function(){
        this.Timer = $timeout(this.CountDown(),this.Options.delta); 
    };
    
    this.Stop = function(){
        this.Pause();
        $scope.T = this.Options.T_Start;
    };
    this.Pause = function(){
       if(this.Timer){
            $timeout.cancel(this.Timer);
        } 
    };  
    
    this.Options = {};    
    $scope.T = 10000;
    this.Timer = null;
    
    
    if(typeof options === "CountDownOpts")
    {
        this.Options = options;
    }else{
        this.Options = new CountDownOpts();
    }
};

function CountDownOpts(){
    this.T_Start = 10000;
    this.T_Stop = 0;
    this.delta =  -1000;
    this.loop =  false;
};
