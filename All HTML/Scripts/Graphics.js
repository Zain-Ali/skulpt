/**
 * Created by zain on 11/11/2016.
 */

var GraphWinJs, Point, Circle;

$(function(){
    GraphWinJs = function(canvasParentId, width, height){
        if(canvasParentId == undefined)
            error('GraphWinJs canvasId undefined');
        if(width == undefined)
            this.width = 300;
        if(height)
            this.height = 300;

        //to do!
        //Validate Canvas parent exsists
        ///NEED TO ENSURE CHANGES TO HEIGHT VARIABLE AFFECT CANVAS ELEMENT
        this.canvas = $('#'+ canvasParentId)
            .append('<canvas height="'+height+'" width="'+width+'"> </canvas>')
            .children().last().get(0);
        this.context = this.canvas.getContext("2d");
    };

    GraphWinJs.prototype.close = function(){
        //remove canvas obj from dom using jquery
    };

    Point = function(x,y){
        if(x == undefined || y == undefined)
            throw ("Point class needs x and y cords");
        this.x = x;
        this.y = y;
    };


    Circle = function(point,  radius){
        if(point == undefined || point.x == undefined)
            throw ('A cricle needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
    };

    Circle.prototype.draw = function(graphWinObj){
        debugger;
        var con = graphWinObj.context;
        con.beginPath();
        con.arc(this.point.x, this.point.y, this.radius, 0, 2*Math.PI);
        con.stroke();
    };



});









