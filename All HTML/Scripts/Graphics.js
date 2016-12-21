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

var Text;
var color;


function getHtmlTemplate()
{
    debugger;
    var txt = "";
    txt += "<Style> svg, body{width: 100%; height: 100%;} </style>";
    return txt;
}



//$() for JS query
$(function(){
    // we get the parentelement by id using Jquery
    // we do this so we can get new canvas just like new window would be
    GraphWinJs = function(title, width, height){
        debugger;
        if(width == undefined)
            this.width = 300;
        if(height)
            this.height = 300;

        this.windw = window.open('about:blank', title, "height=300, width=300, top=400, left=400");
        this.doc = this.windw.document;

        this.doc.write(getHtmlTemplate() + '<svg id="mySvg"></svg>');
        this.svg = $(this.doc).find('#mySvg').first();
        this.windw.document.close();
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
            throw ('A circle needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
        //this.domObj = null;
    };

    Circle.prototype.draw = function(graphWinObj){
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', this.point.x);
        circle.setAttribute('cy', this.point.y);
        circle.setAttribute('r', this.radius);
        //circle.style.stroke = '#000';
        //circle.style.srokewidth = '3px';
        //circle.style.fill = '#f00';
        debugger;
        this.__insertIfNeeded(circle, graphWinObj);
    };

    Circle.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        debugger;
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Circle.prototype.undraw = function(graphWinObj)
    {
        debugger;
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };


    ellipse = function(point,  radius){
        //debugger;
        if(point == undefined || point.x == undefined)
            throw ('A oval needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
        //this.domObj = null;
    };

    ellipse.prototype.draw = function(graphWinObj){
        var oval = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
        oval.setAttribute('cx', this.point.x);
        oval.setAttribute('cy', this.point.y);
        oval.setAttribute('rx', this.radius.x);
        oval.setAttribute('ry', this.radius.y);
        debugger;
        this.__insertIfNeeded(oval, graphWinObj);
        console.log("oval draw");
    };

    ellipse.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        debugger;
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    ellipse.prototype.undraw = function(graphWinObj)
    {
        debugger;
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



    Rectangle = function (width, height) {
        //debugger;
        if (width == undefined || height == undefined)
            throw ('A rectangle needs points');
        this.width = width.x;
        this.height = height.y;
    };

    Rectangle.prototype.draw = function(graphWinObj){
        //debugger;
        var svg = graphWinObj.svg;
        var rec = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        debugger;
        rec.setAttribute('width', this.width);
        rec.setAttribute('height', this.height);

        console.log(rec);
        //svg.appendChild(rec);
        this.__insertIfNeeded(rec, graphWinObj);
    };

    Rectangle.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        debugger;
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Rectangle.prototype.undraw = function(graphWinObj)
    {
        debugger;
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



    Line = function (x1, y1, x2, y2) {
        //debugger;
        if (x == undefined || y == undefined)
            throw ('A line needs points');
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

    };

    Line.prototype.draw = function(graphWinObj){
        //debugger;

        var svg = graphWinObj.svg;
        var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', this.x1);
        line.setAttribute('y1', this.y1);
        line.setAttribute('x2', this.x2);
        line.setAttribute('y2', this.y1);
        this.__insertIfNeeded(line, graphWinObj);

    };

    Line.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        debugger;
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Line.prototype.undraw = function(graphWinObj)
    {
        debugger;
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };


    colour = function() {
        //to do
    };

});


