/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Factor(param){
    this.Description = param.Description;
    this.Weight = param.Weight;
}
Factor.prototype.constructor = Factor;
Factor.prototype.valueOf = this.Description;

function Item(param){
    console.log("Item::Constructor");
    this.Description = param.Description;
    this.Factors = new Array();
    this.addFaktors(param.Factors);
};
Item.prototype = {
    constructor: Item,
    addFaktors: function(factors){
        if(factors instanceof Factor){
            this.Factors.push(factors);
        }
        else if(factors.length > 1){
            for(var i = 0; i < factors.length; ++i){
                var fac = factors[i];
                if(fac instanceof Factor){
                    this.Factors.push(fac);
                }
            }
        }
    },
    removeFactors: function(factors){
        var obj = this;
        $.each(factors,function(idx,val){
            obj.removeFactor(val);
        });
    },
    removeFactor: function(factor){
       this.Factors.splice($.inArray(factor,this.Factors),1);
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