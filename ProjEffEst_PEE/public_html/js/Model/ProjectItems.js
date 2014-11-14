function LeaveItem(parent){
    this.parent = parent;
    return this;
};

function RootItem(parent,childs){
    this.parent = parent;
    this.Childs = childs;
    this.AccumulateValues = function(){
        Console.warn("NotImplemented: Returns accumulated Estimates");
    };
    return this;
};

function Item(){
   this.parent = null;
   this.Estimates = new ItemValue();
};

function ItemValue(){
    this.ProjectValue = 1;
    this.ProjectDependency = 1;
    this.Cost = 1;
    this.Effort = 1;    
    return this;
};

function AccumulatedValues(){
    this.Values = [
        ["q0",new ItemValue()],
        ["q25",new ItemValue()],
        ["q50",new ItemValue()],
        ["q75",new ItemValue()],
        ["q1",new ItemValue()]
    ];
    this.GetQuantile = function(q){
        for(var i = 0; i < this.Values.length; ++i){
            var val = this.Values[i];
            if(val[0] === q){
                return val[1];
            }
        }
        Console.warn("Quantile (" + q + ") could not be found. Default ItemValue will be returned");
        return new ItemValue();
    };
    return this;
}