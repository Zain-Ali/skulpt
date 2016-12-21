/**
 * Created by zain on 11/11/2016.
 */


var GraphWinJs;
var Point;
var Circle;
var Rectangle;
var Line;
var Polygon;

var Triangle;
var Oval;

var Text;
var color;



function getHtmlTemplate()
{
    var txt = "";
    txt += "<Style> svg, body{width: 100%; height: 100%;} </style>";
    return txt;
}



$(function(){
    GraphWinJs = function(title, width, height)
    {
        //debugger;
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

    GraphWinJs.prototype.close = function()
    {
        //remove canvas obj from dom using jquery
    };



    Point = function(x, y)
    {
        if(x == undefined || y == undefined)
            throw ("Point class needs x and y cords");
        this.x = x;
        this.y = y;
    };



    Circle = function(point,  radius)
    {
        if(point == undefined || point.x == undefined)
            throw ('A circle needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
        //this.domObj = null;
    };

    Circle.prototype.draw = function(graphWinObj)
    {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', this.point.x);
        circle.setAttribute('cy', this.point.y);
        circle.setAttribute('r', this.radius);
        //circle.style.stroke = '#000';
        //circle.style.fill = 'transparent';
        this.__insertIfNeeded(circle, graphWinObj);
    };

    ////////////////
    // //debugger;
    // Circle.prototype.setFill = function(fill, graphWinObj)
    // {
    //     this.fill=fill.v;
    //
    // };
    //////////////////


    Circle.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Circle.prototype.undraw = function(graphWinObj)
    {
        //debugger;
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



    Rectangle = function (width, height)
    {
        if (width == undefined || height == undefined)
            throw ('A rectangle needs points');
        this.width = width.x;
        this.height = height.y;
        //this.domObj = null;
    };

    Rectangle.prototype.draw = function(graphWinObj)
    {
        var svg = graphWinObj.svg;
        var rec = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rec.setAttribute('width', this.width);
        rec.setAttribute('height', this.height);
        this.__insertIfNeeded(rec, graphWinObj);
    };

    Rectangle.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Rectangle.prototype.undraw = function(graphWinObj)
    {
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



    Line = function(point1,  point2)
    {
        if(point1 == undefined)
            throw ('A  needs cords');
        if(point2 == undefined)
            point2 = 20;
        this.point1 = point1;
        this.point2 = point2;
        //this.domObj = null;
    };

    Line.prototype.draw = function(graphWinObj)
    {
        var svg = graphWinObj.svg;
        var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', this.point1.x);
        line.setAttribute('y1', this.point1.y);
        line.setAttribute('x2', this.point2.x);
        line.setAttribute('y2', this.point2.y);
        line.style.stroke = 'black';
        this.__insertIfNeeded(line, graphWinObj);

    };

    Line.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0)
        {
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
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



    Polygon = function(point1,  point2, point3)
    {
        if(point1 == undefined || point2 == undefined || point3 == undefined)
            throw ('A  needs cords');
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        //this.domObj = null;
    };

    Polygon.prototype.draw = function(graphWinObj)
    {
        var svg = graphWinObj.svg;
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", 'Polygon');
        polygon.setAttribute('x1', this.point1.x);
        polygon.setAttribute('y1', this.point1.y);
        polygon.setAttribute('x2', this.point2.x);
        polygon.setAttribute('y2', this.point2.y);
        polygon.setAttribute('x3', this.point3.x);
        polygon.setAttribute('y3', this.point3.y);

        polygon.style.stroke = '#000';
        polygon.style.fill = '#FF0000';
        this.__insertIfNeeded(polygon, graphWinObj);

    };

    Polygon.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0)
        {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Polygon.prototype.undraw = function(graphWinObj)
    {
        debugger;
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };





//End of Main Function
});


