/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function IDHandler(){
    this.IDs = new Array();
}

IDHandler.prototype = {
    add: function(){
        var newID = 1;
        var idxEnd = this.lastIdx();
        if(this.IDs[idxEnd]){
            newID = this.IDs[idxEnd] + 1;
        }
        this.IDs.push(newID);
        console.log("IDHandler::add - newID: " + newID);
        return newID;
    },
    remove: function(id){        
        var idx = this.IDs.indexOf(id);
        console.log("IDHandler::remove - id: " + id + " index: " + idx);
        this.IDs[idx] = [];        
        return this.IDs[this.lastIdx()];
    },
    lastIdx: function(){
        var idx = this.IDs.length -1;
        console.log("IDHandler::last - index: " + idx);
        return idx;
    },
    exist: function(id){
        var idx = this.IDs.indexOf(id);
        console.log("IDHandler::exist - id: " + id + " index: " + idx);
        return this.IDs.indexOf(id);
    }
};