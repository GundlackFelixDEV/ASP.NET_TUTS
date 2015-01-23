/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Factor(param){
    this.ID = param.ID;
    this.Description = param.Description;
    this.Value =  param.Value?param.Value:3;
    this.Weight = param.Weight?param.Weight:3;
    this.WeightRange    = param.WeightRange?param.WeightRange:  [1,2,3,4,5];
    this.ValueRange     = param.ValueRange?param.ValueRange:    [1,2,3,4,5];
};
Factor.prototype.constructor = Factor;
Factor.prototype.valueOf = function(){
    return this.Description;
};

function Item(param){
    console.log("Item::Constructor");
    this.Description = param.Description;
    this.ID = param.ID;
    this.Values = [];
};

Item.prototype = {
    constructor: Item,
    setValue: function(param){
        var ID = param.ID;
        var VALUE = param.Value;
        console.log("Item(" + this.Description + ").setValue("+param+")");
        var val = $.grep(this.Values,function(n,i){
           return n.FACTOR_ID === ID; 
        });
        val.Value = VALUE;        
    },
    valueOf: this.Description
};

function RootItem(param){
    console.log("RootItem::Constructor");
    Item.call(this,param);
    this.Children = param.Children;
}
RootItem.prototype.addChild = function(child){
    this.Children.push(child);
};
RootItem.prototype.removeChilds = function(childs){
    var obj = this;
    $.each(childs,function(idx,val){
        obj.removeChild(val);
    });
};
RootItem.prototype.removeChild = function(child){
    this.Children.splice($.inArray(child,this.Children),1); 
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//Controller Structure to handle Array of Items
function ItemController(type){
    this.ItemType = type;
    this.Items = new Array();
    this.IDs = new IDHandler();
    
    //Enhance Factor Class with ID
    this.ItemType.prototype.valueOf = function(){
        return this.ID;
    };
}
ItemController.prototype = {
    valueOf: function(){
        return "ItemController" + ":" + this.ItemType;
    },
    Count: function(){
        var cnt = this.Items.length;
        console.log("ItemController::Count - " + cnt);
        return cnt;
    },
    Update: function(factor){
        console.log("ItemController::Update");
        if(factor instanceof this.ItemType){
            var idx = this.indexOf(factor);
            if(idx < 0){
                this.Add(factor);
            }else{
                this.Items[idx] = factor;
            }
        }
    },
    Add: function(factor){
        console.log("ItemController::Add");
        if(factor instanceof this.ItemType){
            var idx = this.Items.indexOf(factor);
            if(idx < 0){
                this.Items.push(factor);
            }else{
                this.Update(factor);
            }
        }
    },
    Remove: function(factor){
        console.log("ItemController::Remove");
        if(factor instanceof this.ItemType){
            this.IDs.remove(factor.ID);
            this.Items.splice($.inArray(factor,this.Items),1);
        }
    }
};


//Inheritance
extend(Item,RootItem);
function extend(base, sub) {
  // Avoid instantiating the base class just to setup inheritance
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  // for a polyfill
  // Also, do a recursive merge of two prototypes, so we don't overwrite 
  // the existing prototype, but still maintain the inheritance chain
  // Thanks to @ccnokes
  var origProto = sub.prototype;
  sub.prototype = Object.create(base.prototype);
  for (var key in origProto)  {
     sub.prototype[key] = origProto[key];
  }
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
  // In ECMAScript5+ (all modern browsers), you can make the constructor property
  // non-enumerable if you define it like this instead
  Object.defineProperty(sub.prototype, 'constructor', { 
    enumerable: false, 
    value: sub 
  });
}