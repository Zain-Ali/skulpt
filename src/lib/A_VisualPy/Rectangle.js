/**
 * Created by zain on 11/11/2016.
 */

var $builtinmodule = function(name){
    "use strict";

    var Rectangle = function(width, length, x, y){
        this.width = width;
        this.length = length;
        this.x = x;
        this.y = y;
        this.draw();
    }

    Rectangle.prototype.update = function() {

    };

    Rectangle.draw = function(){

    }
    return new Rectangle();
}

