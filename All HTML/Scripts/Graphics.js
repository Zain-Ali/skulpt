
/**
 * Created by zain on 11/11/2016.
 */

var GraphWinJs;
var Point;
var Circle;
var Rectangle;
var Line;
var Oval;
var Polygon;
var Text;
var Image;

var color;

//have class for all shapes
// {
//first thing as super class
// }


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

    GraphWinJs.prototype.setBackground = function()
    {
        //set background colour
    };

    GraphWinJs.prototype.close = function()
    {
        //remove canvas obj from dom using jquery
        this.windw.close();
    };



    Point = function(x, y)
    {
        if(x == undefined || y == undefined)
            throw ("Point class needs x and y cords");
        this.x = x;
        this.y = y;
    };

    //Does not draw on SVG Window
    Point.prototype.draw = function(graphWinObj)
    {
        var svg = graphWinObj.svg;
        var point = document.createElementNS("http://www.w3.org/2000/svg", 'point');
        point.setAttribute('x1', this.x);
        point.setAttribute('y1', this.y);

        this.__insertIfNeeded(point, graphWinObj);

    };

    Point.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0)
        {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Point.prototype.undraw = function(graphWinObj)
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

    //modelOBJ name is used because its generic and can be used for super class

    Circle = function(point,  radius)
    {
        if(point == undefined || point.x == undefined)
            throw ('A circle needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;

        this.circleModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        //custom default setting of colours
        this.circleModelObj.style.stroke = '#000';
        this.circleModelObj.style.fill = 'transparent';

        //this.domObj = null;
    };

    Circle.prototype.draw = function(graphWinObj)
    {
        this.circleModelObj.setAttribute('cx', this.point.x);
        this.circleModelObj.setAttribute('cy', this.point.y);
        this.circleModelObj.setAttribute('r', this.radius);

        this.__insertIfNeeded(this.circleModelObj, graphWinObj);
    };

    Circle.prototype.setFill = function(fill)
    {
        this.circleModelObj.style.fill = fill;
    };

    Circle.prototype.setOutline = function(stroke)
    {
        this.circleModelObj.style.stroke = stroke;
    };

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

        this.recModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        //custom default setting of colours
        this.recModelObj.style.stroke = '#000';
        this.recModelObj.style.fill = 'transparent';
        //this.domObj = null;
    };

    Rectangle.prototype.draw = function(graphWinObj)
    {
        //var svg = graphWinObj.svg;
        this.recModelObj.setAttribute('width', this.width);
        this.recModelObj.setAttribute('height', this.height);
        this.__insertIfNeeded(recModelObj, graphWinObj);
    };

    Rectangle.prototype.setFill = function(fill)
    {
        this.recModelObj.style.fill = fill;
    };

    Rectangle.prototype.outLine = function(stroke)
    {
        this.recModelObj.style.stroke = stroke;
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
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };


    //not printing Oval but Circle.  it change the rx, and ry to 20 and not the user input
    //It isn't reading radius and change the rx and ry value to 20 based on line 250 and 251
    Oval = function(point,  radius)
    {
        if(point == undefined)
            throw ('A Ellipse needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
        //this.domObj = null;
    };

    Oval.prototype.draw = function(graphWinObj)
    {
        var ellipse = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
        ellipse.setAttribute('cx', this.point.x);
        ellipse.setAttribute('cy', this.point.y);
        ellipse.setAttribute('rx', this.radius);
        ellipse.setAttribute('ry', this.radius);

        //circle.style.stroke = '#000';
        //circle.style.fill = 'transparent';
        this.__insertIfNeeded(ellipse, graphWinObj);

        console.log('cx', this.point.x);
        console.log('cy', this.point.y);
        console.log('rx', this.radius);
        console.log('ry', this.radius);
    };


    Oval.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Oval.prototype.undraw = function(graphWinObj)
    {
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



    //Not printing on the screen
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


    Text = function(point, text)
    {
        if(point == undefined)
            throw ('A  needs cords');

        this.point = point;
        this.text = text;
        //this.domObj = null;
    };

    Text.prototype.draw = function(graphWinObj)
    {
        var svg = graphWinObj.svg;
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute('x', this.point.x);
        text.setAttribute('y', this.point.y);
        //text.textContent = "abcde";
        text.textContent = this.text;
        text.style.stroke = '#FF0000';
        this.__insertIfNeeded(text, graphWinObj);

    };

    Text.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0)
        {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Text.prototype.undraw = function(graphWinObj)
    {
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



    Image = function (point, image)
    {
        if (point == undefined)
            throw ('A image needs points');
        this.point = point;
        this.image = image;
        //this.domObj = null;
    };

    Image.prototype.draw = function(graphWinObj)
    {
        var svg = graphWinObj.svg;
        var img = document.createElementNS("http://www.w3.org/2000/svg", 'image');
        img.setAttribute('width', this.point.x);
        img.setAttribute('height', this.point.y);

        //image attribute
        //img --------
        //img.preserveAspectRatio = this.image;
        img.iri = this.image;
        console.log(this.image);
        this.__insertIfNeeded(img, graphWinObj);
    };

    Image.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };

    Image.prototype.undraw = function(graphWinObj)
    {
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };



//End of Main Function
});


