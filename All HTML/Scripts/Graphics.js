/**
 * Created by zain on 11/11/2016.
 */
//pure JS file

var GraphWinJs, Point, Circle;
var Rectangle;
// the variable is going to be glaoble scope which mean accessable anywhere.
// which means our classes are accessable anywhere
//$() fro JS query

$(function(){
    // we get the parentelement by id using Jquery
    // we do this so we can get new canvas just like new window would be
    GraphWinJs = function(canvasParentId, width, height){
        // the above is  constructor for the graphwinjs class
        if(canvasParentId == undefined)
            error('GraphWinJs canvasId undefined');
        if(width == undefined)
            this.width = 300;
        if(height)
            this.height = 300;

        //to do!
        //Validate Canvas parent exsists
        ///NEED TO ENSURE CHANGES TO HEIGHT VARIABLE AFFECT CANVAS ELEMENT

        //seaching by id which means is either going to be 1 or 0
        this.canvas = $('#'+ canvasParentId)
            .append('<canvas height="'+height+'" width="'+width+'"> </canvas>')
            .children().last().get(0);
        //it treatment canvas as the same way windows behove so I can keep on declaring ID
        //it keeeps on adding to the above parentID and saves the element created in canvas variable

        this.context = this.canvas.getContext("2d");
    };
    //we use prototype when we declare new instance of graphwinjs that the close function is present.
    //create the prototype of the object

    GraphWinJs.prototype.close = function(){
        //remove canvas obj from dom using jquery
    };

    //
    Point = function(x,y){
        if(x == undefined || y == undefined)
            throw ("Point class needs x and y cords");
        this.x = x;
        this.y = y;
    };


    Circle = function(point,  radius){
        debugger;
        if(point == undefined || point.x == undefined)
            throw ('A cricle needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
    };

    //it adds the draw function to circle just once
    //this code is only execute once
    Circle.prototype.draw = function(graphWinObj){
        var con = graphWinObj.context;
        con.beginPath();
        con.arc(this.point.x, this.point.y, this.radius, 0, 2*Math.PI);
        con.stroke();
    };

    Rectangle = function (TopLeftCorner, BottomRightCorner) {
        if (TopLeftCorner == undefined || BottomRightCorner == undefined)
            throw ('A rectangle needs points');
        this.TopLeftCorner = TopLeftCorner;
        this.BottomRighCorner = BottomRightCorner;
    };
    
    Rectangle.prototype.draw = function(graphWinObj){
        debugger;
        var con = graphWinObj.context;
        con.beginPath();

        debugger;
        var width = this.TopLeftCorner.x - this.BottomRighCorner.x;
        var height = this.TopLeftCorner.y - this.BottomRighCorner.y;

        con.rect(this.TopLeftCorner.x, this.BottomRighCorner.y, width, height);
        con.stroke();
    };
});






