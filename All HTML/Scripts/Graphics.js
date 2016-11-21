/**
 * Created by zain on 11/11/2016.
 */
//pure JS file

/**
 * for Graphics Shapes.
 */
var GraphWinJs;
var Point;
var Circle;
var Rectangle;
var Line;
var Triangle;
var Oval;

/**
 * for Graphics Text.
 */
var Text;

var color;

// the variable is going to be glaoble scope which mean accessable anywhere.
// which means our classes are accessable anywhere

function getHtmlTemplate()
{
    var txt = "";
    txt += "<Style> svg, body{width: 100%; height: 100%;} </style>"
    return txt;
}


//$() fro JS query
$(function(){
    // we get the parentelement by id using Jquery
    // we do this so we can get new canvas just like new window would be
    GraphWinJs = function(title, width, height){
        if(width == undefined)
            this.width = 300;
        if(height)
            this.height = 300;

        this.windw = window.open('about:blank', title);
        this.doc = this.windw.document;

        this.doc.write(getHtmlTemplate() + '<svg id="mySvg"></svg>')
        this.svg = $(this.doc).find('#mySvg').first();
        this.windw.document.close();


        // var svg_blob = new Blob([serializer.serializeToString(svg)],
        //     {'type': "image/svg+xml"});
        // var url = URL.createObjectURL(svg_blob);
        //
        // var svg_win = window.open(url, "svg_win");


        //it treatment canvas as the same way windows behove so I can keep on declaring ID
        //it keeeps on adding to the above parentID and saves the element created in canvas variable
        // console.log(document.svg);
        //this.context = this.canvas.getContext("2d");
    };
    //we use prototype when we declare new instance of graphwinjs that the close function is present.
    //create the prototype of the object

    GraphWinJs.prototype.close = function(){
        //remove canvas obj from dom using jquery
    };

    Point = function(x, y){
        //debugger;
        if(x == undefined || y == undefined)
            throw ("Point class needs x and y cords");
        this.x = x;
        this.y = y;
    };

    Circle = function(point,  radius){
        //debugger;
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
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', this.point.x);
        circle.setAttribute('cy', this.point.y);
        circle.setAttribute('r', this.radius);
        circle.style.stroke = '#000';
        circle.style.srokewidth = '3px';
        circle.style.fill = '#f00';
        debugger;

        this.__insertIfNeeded(circle, graphWinObj);
    };

    Circle.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        //todo check allready added? Mhhh
        $(graphWinObj.svg).append(domElem);
    }


    Rectangle = function (TopLeftCorner, BottomRightCorner) {
        //debugger;
        if (TopLeftCorner == undefined || BottomRightCorner == undefined)
            throw ('A rectangle needs points');
        this.TopLeftCorner = TopLeftCorner;
        this.BottomRighCorner = BottomRightCorner;
    };

    Rectangle.prototype.draw = function(graphWinObj){
        //debugger;
        var con = graphWinObj.context;
        con.beginPath();

        //debugger;
        var width = this.TopLeftCorner.x - this.BottomRighCorner.x;
        var height = this.TopLeftCorner.y - this.BottomRighCorner.y;

        con.rect(this.TopLeftCorner.x, this.BottomRighCorner.y, width, height);
        con.stroke();
    };

    Line = function (x, y) {
        //debugger;
        if (x == undefined || y == undefined)
            throw ('A line needs points');
        this.x = x;
        this.y = y;
    };

    Line.prototype.draw = function(graphWinObj){
        //debugger;
        var con = graphWinObj.context;
        con.beginPath();
        con.moveTo(x, y);
        con.lineTo(this.x.x, this.y.y);
        con.stroke();
    };

    // /*
    //  * Non Working Code
    //  */
    // Triangle = function (width, height) {
    //     //debugger;
    //     if (width == undefined || height == undefined)
    //         throw ('A line needs points');
    //     this.width = width;
    //     this.height = height;
    // };
    //
    // /*
    //  * Non Working Code
    //  */
    // Triangle.prototype.draw = function(graphWinObj){
    //     //debugger;
    //     var con = graphWinObj.context;
    //     con.beginPath();
    //     con.moveTo(width, height);
    //     con.lineTo(this.width.x, this.height.y);
    //     con.lineTo(this.width.x, this.height.y);
    //     con.stroke();
    // };

    // Oval = function(point,  radius){
    //     //debugger;
    //     if(point == undefined || point.x == undefined)
    //         throw ('A Oval needs cords');
    //     if(radius == undefined)
    //         radius = 20;
    //     this.point = point;
    //     this.radius = radius;
    // };
    //
    // Oval.prototype.draw = function(graphWinObj){
    //     var con = graphWinObj.context;
    //     con.beginPath();
    //     con.translate(canvas.width /2, canvas.height /2);
    //     context.scale(x, y);
    //     con.stroke();
    // };


    //problem returning [object Object]
    //
    Text = function (text, point) {
        //debugger;
        if (text == undefined || point == undefined)
            throw ('Please write coords and text');
        this.text = text;
        this.point = point;
    };

    Text.prototype.draw = function(graphWinObj) {
        var con = graphWinObj.context;
        con.fillText(this.text, this.point.x, this.point.y)
    }

});


