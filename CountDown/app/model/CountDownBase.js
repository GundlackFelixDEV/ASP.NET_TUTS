function CountDown(duration,container){
    this.myInterval = null;
    this.setDuration(typeof(duration) === "undefined"?10:duration);
    this.setContainer(container);
    this.Container.html(CountDown.Message.Stop);
};
CountDown.Message = {Update:"s remaining",Stop:"Stoped",Pause:"Paused",Finish:"Finished"};

CountDown.prototype = {
    callback: function(){
        console.log("CountDown::callback");
        $(this).html(CountDown.Message.Finish);
    },
    start: function(){
        console.log("CountDown::start");
        var dom = this.Container;
        this.myInterval = dom.countdown(this.callback, this.T_Duration, CountDown.Message.Update);
        dom.bind(CountDown.Message.Finish);
    },
    stop: function(){
        console.log("CountDown::stop");
        this.T = this.T_Duration;
        clearInterval(this.myInterval);
        this.Container.html(CountDown.Message.Stop);
    },
    pause: function(){
        console.log("CountDown::pause");
        clearInterval(this.myInterval);
        this.Container.html(CountDown.Message.Pause);
    },
    handleUpdate: function(target,evData){
        this.T = evData.Duration;
    },
    setCallback: function(callback){
        if(typeof(callback) === "function"){
            CountDown.prototype.callback = callback;
        }
    },
    setDuration: function(duration){
        this.T_Duration = duration;
        this.T = duration;
    },
    setContainer: function(container){
        this.Container = $(container);
        return this.Container;
    },
    toString: function(separator){
        var sep = typeof(separator)==="undefined"?";":separator;
        return "CountDown" + sep + this.T + sep + this.T_Duration + sep + this.Message;
    }
};

$.fn.countdown = function(callback,duration, message) {
    message = message || "";
    var container = $(this).html(duration + message);
    var interval = setInterval(function () {
        if (--duration) {
            container.html(duration + message);
            container.trigger("CountDownUpdate",{Interval:interval,Duration:duration});
            console.log(duration + message);
        // Otherwise
        } else {
            container.trigger("CountDownEnd",{Interval:interval,Duration:duration});
            clearInterval(interval);
            callback.call(container);   
        }
    }, 1000);
    return interval;
};

