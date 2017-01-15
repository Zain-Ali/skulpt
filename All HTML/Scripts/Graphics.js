
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
var Entry;
var Image;


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


    GraphWinJs.prototype.close = function()
    {
        //remove svg obj from dom using jquery
        this.windw.close();
    };


    //PlaceHolder for Future Interactive Functionality
    GraphWinJs.prototype.setBackground = function(background)
    {

    };


    GraphWinJs.prototype.plot = function()
    {

    };


    GraphWinJs.prototype.plotPixel = function()
    {

    };


    GraphWinJs.prototype.setCoords = function()
    {

    };


    GraphWinJs.prototype.getMouse = function()
    {

    };


    GraphWinJs.prototype.checkMouse = function()
    {

    };


    GraphWinJs.prototype.getKey = function()
    {

    };


    GraphWinJs.prototype.checkKey = function()
    {

    };



    Point = function(x, y)
    {
        if(x == undefined || y == undefined)
            throw ("Point class needs x and y cords");
        this.x = x;
        this.y = y;
        this.domObj = null;

        this.pointModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'point');
    };


    //Does not draw on SVG Window
    Point.prototype.draw = function(graphWinObj)
    {
        this.pointModelObj.setAttribute('x1', this.x);
        this.pointModelObj.setAttribute('y1', this.y);

        this.__insertIfNeeded(this.pointModelObj, graphWinObj);
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
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };


    Point.prototype.getX = function()
    {
        return this.x;
    };


    Point.prototype.getY = function()
    {
        return this.y;
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
        this.domObj = null;

        this.circleModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        //custom default setting of colours
        this.circleModelObj.style.stroke = '#000'; //black
        this.circleModelObj.style.fill = 'transparent';
        this.circleModelObj.style.strokeWidth = 1;

    };


    Circle.prototype.draw = function(graphWinObj)
    {
        this.circleModelObj.setAttribute('cx', this.point.x);
        this.circleModelObj.setAttribute('cy', this.point.y);
        this.circleModelObj.setAttribute('r', this.radius);

        this.__insertIfNeeded(this.circleModelObj, graphWinObj);
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


    Circle.prototype.setFill = function(fill)
    {
        this.circleModelObj.style.fill = fill;
    };


    Circle.prototype.setOutline = function(stroke)
    {
        this.circleModelObj.style.stroke = stroke;
    };


    Circle.prototype.getP1 = function()
    {
        this.circleModelObj.setAttribute('cx', this.point.x);
        this.circleModelObj.setAttribute('cy', this.point.y);
        this.circleModelObj.setAttribute('r', this.radius);

        console.log(this.point.x);
        return this.point.x;
    };


    Circle.prototype.getP2 = function()
    {
        this.circleModelObj.setAttribute('cx', this.point.x);
        this.circleModelObj.setAttribute('cy', this.point.y);
        this.circleModelObj.setAttribute('r', this.radius);

        console.log(this.point.x);
        return this.point.x;
    };


    Circle.prototype.getRadius = function()
    {
        console.log(this.radius);
        return this.radius;
    };


    Circle.prototype.getCenter = function()
    {
        console.log("Point ("+[this.point.x, this.point.y]+")");
        return ([this.point.x, this.point.y]);
        //return "Point ("+[this.point.x, this.point.y]+")";
    };


    Circle.prototype.setWidth = function(width)
    {
        this.circleModelObj.style.strokeWidth = width;
    };


    Circle.prototype.move = function(dx, dy)
    {
        this.circleModelObj.setAttribute('cx', dx);
        this.circleModelObj.setAttribute('cx', dy);
    };


    Circle.prototype.clone = function()
    {

    };



    Rectangle = function (width, height)
    {
        if (width == undefined || height == undefined)
            throw ('A rectangle needs points');
        this.width = width.x;
        this.height = height.y;
        this.domObj = null;

        this.recModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        //custom default setting of colours
        this.recModelObj.style.stroke = '#000'; //black
        this.recModelObj.style.fill = 'transparent';
        this.recModelObj.style.strokeWidth = 1;
    };


    Rectangle.prototype.draw = function(graphWinObj)
    {
        //debugger;
        this.recModelObj.setAttribute('width', this.width);
        this.recModelObj.setAttribute('height', this.height);
        this.__insertIfNeeded(this.recModelObj, graphWinObj);
    };


    Rectangle.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0)
        {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };


    Rectangle.prototype.undraw = function(graphWinObj)
    {
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };


    Rectangle.prototype.setFill = function(fill)
    {
        this.recModelObj.style.fill = fill;
    };


    Rectangle.prototype.setOutline = function(stroke)
    {
        this.recModelObj.style.stroke = stroke;
    };


    Rectangle.prototype.getP1 = function()
    {

    };


    Rectangle.prototype.getP2 = function()
    {

    };


    Rectangle.prototype.getCenter = function()
    {

    };


    Rectangle.prototype.setWidth = function(width)
    {
        this.recModelObj.style.strokeWidth = width;

    };


    Rectangle.prototype.move = function(dx, dy)
    {
        this.recModelObj.setAttribute('x', dx);
        this.recModelObj.setAttribute('y', dy);
    };


    Rectangle.prototype.clone = function()
    {

    };



    Line = function(point1,  point2)
    {
        if(point1 == undefined)
            throw ('A  needs cords');
        if(point2 == undefined)
            point2 = 20;
        this.point1 = point1;
        this.point2 = point2;
        this.domObj = null;

        this.lineModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        this.lineModelObj.style.stroke = '#000'; //black
        this.lineModelObj.style.strokeWidth = 1;

    };


    Line.prototype.draw = function(graphWinObj)
    {
        this.lineModelObj.setAttribute('x1', this.point1.x);
        this.lineModelObj.setAttribute('y1', this.point1.y);
        this.lineModelObj.setAttribute('x2', this.point2.x);
        this.lineModelObj.setAttribute('y2', this.point2.y);
        this.__insertIfNeeded(this.lineModelObj, graphWinObj);
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


    Line.prototype.setOutline = function(stroke)
    {
        this.lineModelObj.style.stroke = stroke;
    };


    Line.prototype.getCenter = function()
    {
        /**
         *
         * Formula to get Mid Point of Line using Points
         */
        var P1 = ((this.point1.x + this.point2. x) / 2);
        var P2 = ((this.point1.y + this.point2. y) / 2);
        console.log(P1);
        console.log(P2);

        console.log(P1, P2);
        return (P1, P2);



    };


    Line.prototype.getP1 = function()
    {

    };


    Line.prototype.getP2 = function()
    {

    };


    Line.prototype.setWidth = function(width)
    {
        this.lineModelObj.style.strokeWidth = width;
    };


    Line.prototype.move = function(dx, dy)
    {
        this.lineModelObj.setAttribute('x1', dx);
        this.lineModelObj.setAttribute('x2', dy);
    };


    Line.prototype.clone = function()
    {

    };



    //not printing Oval but Circle.  it change the rx, and ry to 20 and not the user input
    //It isn't reading radius and change the rx and ry value to 20 based on line 250 and 251
    Oval = function(point,  radius)
    {
        console.log(point);
        console.log(radius);
        if(point == undefined)
            throw ('A Ellipse needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
        this.domObj = null;

        this.ovalModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
        this.ovalModelObj.style.stroke = '#000'; //black
        this.ovalModelObj.style.fill = 'transparent';
        this.ovalModelObj.style.strokeWidth = 1;

    };


    Oval.prototype.draw = function(graphWinObj)
    {
        debugger;
        this.ovalModelObj.setAttribute('cx', this.point.x);
        this.ovalModelObj.setAttribute('cy', this.point.y);
        this.ovalModelObj.setAttribute('rx', this.radius);
        this.ovalModelObj.setAttribute('ry', this.radius);

        this.__insertIfNeeded(this.ovalModelObj, graphWinObj);

        console.log('cx', this.point.x);
        console.log('cy', this.point.y);
        console.log('rx', this.radius);
        console.log('ry', this.radius);
    };


    Oval.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0)
        {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };


    Oval.prototype.undraw = function(graphWinObj)
    {
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };


    Oval.prototype.setFill = function(fill)
    {
        this.ovalModelObj.style.fill = fill;
    };


    Oval.prototype.setOutline = function(stroke)
    {
        this.ovalModelObj.style.stroke = stroke;
    };


    Oval.prototype.getCenter = function()
    {

    };


    Oval.prototype.getP1 = function()
    {
    };


    Oval.prototype.getP2 = function()
    {
    };


    Oval.prototype.setWidth = function(width)
    {
        this.ovalModelObj.style.strokeWidth = width;
    };


    Oval.prototype.move = function(dx, dy)
    {
        this.ovalModelObj.setAttribute('cx', dx);
        this.ovalModelObj.setAttribute('cy', dy);
    };


    Oval.prototype.clone = function()
    {

    };



    //Hard Coded for Now
    Polygon = function(...points)
    {
        points.forEach(point => console.log(point.getX(), point.getY() ));

        //error checking
        this.points = points;

        this.points = this.points.map(point => `${point.getX()},${point.getY()} `);
        // arrow function
        // String interpolation (Template literals)
        this.points = this.points.reduce( (acc, current) => acc + current);

        this.domObj = null;

        this.polygonModelObj = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.polygonModelObj.style.stroke = '#000';
        this.polygonModelObj.style.fill = 'transparent';
        this.polygonModelObj.style.strokeWidth = 1;

    };

    Polygon.prototype.draw = function(graphWinObj)
    {
        //debugger;
        this.polygonModelObj.setAttribute('points', this.points);
        this.__insertIfNeeded(this.polygonModelObj, graphWinObj);

    };


    Polygon.prototype.setFill = function(fill)
    {
        this.polygonModelObj.style.fill = fill;
    };


    Polygon.prototype.setOutline = function(stroke)
    {
        this.polygonModelObj.style.stroke = stroke;
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
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1)
            {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };


    Polygon.prototype.getPoints = function ()
    {
        console.log("Points (" + this.points + ")");
        return this.points;
    };


    Polygon.prototype.setWidth = function(width)
    {
        this.polygonModelObj.style.strokeWidth = width;
    };


    Polygon.prototype.move = function(dx, dy)
    {
        this.polygonModelObj.setAttribute('dx', dx);
        this.polygonModelObj.setAttribute('dx', dy);
    };


    Polygon.prototype.clone = function()
    {

    };



    Text = function(point, text)
    {
        if(point == undefined)
            throw ('A  needs cords');

        this.point = point;
        this.text = text;
        this.domObj = null;

        this.textModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        this.textModelObj.textContent = this.text;
        this.textModelObj.style.fill = 'black';
        this.textModelObj.style.fontFamily = "arial";
        debugger;
        //this.textModelObj.style.fontSize = "normal";


    };


    Text.prototype.draw = function(graphWinObj)
    {
        this.textModelObj.setAttribute('x', this.point.x);
        this.textModelObj.setAttribute('y', this.point.y);
        this.__insertIfNeeded(this.textModelObj, graphWinObj);
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


    Text.prototype.setTextColor = function(fill)
    {
        //does not change colour
        this.textModelObj.style.fill = fill;
    };


    Text.prototype.setOutline = function(stroke)
    {
        this.textModelObj.style.stroke = stroke;
    };


    Text.prototype.setText = function (text)
    {
        this.textModelObj.textContent = text;
    };


    Text.prototype.getText = function ()
    {
        //doesn't work, returning original text not new setText
        console.log(this.text);
        return this.text;
    };


    Text.prototype.setAnchor = function (text)
    {
        this.textModelObj.setAttribute('x', this.point.x);
        this.textModelObj.setAttribute('y', this.point.y);

        console.log("Point ("+[this.point.x, this.point.y]+")");
        return "Point ("+[this.point.x, this.point.y]+")";

    };


    Text.prototype.setFace = function (fontFace)
    {
        this.textModelObj.style.fontFamily = fontFace;
    };


    Text.prototype.setSize = function (textFontSize)
    {
        //size between 5 and 36
        this.textModelObj.style.fontSize = textFontSize;

    };


    Text.prototype.setStyle = function (boldStyle)
    {
        this.textModelObj.style.fontWeight = boldStyle;
    };


    // Text.prototype.setStyle = function (italicStyle)
    // {
    //     //style is italic and bold italic and bold
    //     this.textModelObj.style.fontStyle = italicStyle;
    // };


    Text.prototype.setTextColor = function (fillTextColor)
    {
        this.textModelObj.style.fill = fillTextColor;
    };


    Text.prototype.move = function(dx, dy)
    {
        this.textModelObj.setAttribute('dx', dx);
        this.textModelObj.setAttribute('dx', dy);
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


        //no attribute for image so far (javascript attributes needed)
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




    Entry = function(point,  radius)
    {
        if(point == undefined || point.x == undefined)
            throw ('A circle needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        this.radius = radius;
        this.domObj = null;

        this.entryModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'foreignObject');
    };


    Entry.prototype.draw = function(graphWinObj)
    {
        this.entryModelObj = document.createElement("input"); //input element, text
        this.entryModelObj.setAttribute('cx', this.point.x);
        this.entryModelObj.setAttribute('cy', this.point.y);
        this.entryModelObj.setAttribute('r', this.radius);

        //
        //this.entryModelObj.setAttribute("type", "text");
        var text = document.createElementNS("http://www.w3.org/1999/xhtml", "textarea");
        text.innerHTML = "hello";
        this.entryModelObj.appendChild(text);
        //document.getElementById("#mySvg").appendChild(this.entryModelObj);


        this.__insertIfNeeded(this.entryModelObj, graphWinObj);
    };


    // http://stackoverflow.com/questions/29295322/javascript-to-create-a-textarea-with-foreign-object-in-svg-not-working
    // var fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    // fo.setAttribute("id", "y");
    // fo.setAttribute("x", "110");
    // fo.setAttribute("y", "50");
    // fo.setAttribute("width", "300");
    // fo.setAttribute("height", "100");
    // var ta = document.createElementNS("http://www.w3.org/1999/xhtml", "textarea");
    // ta.rows = 3;
    // ta.cols = 30;
    // ta.innerHTML = "world";
    // fo.appendChild(ta);
    // document.getElementById("svg").appendChild(fo);


    Entry.prototype.setFill = function(fill)
    {
        this.entryModelObj.style.fill = fill;
    };


    Entry.prototype.setOutline = function(stroke)
    {
        this.entryModelObj.style.stroke = stroke;
    };


    Entry.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        if($(graphWinObj.svg).find(domElem).length == 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    };


    Entry.prototype.undraw = function(graphWinObj)
    {
        if(this.domObj != null)
        {
            if($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    };




    // MouseEvent = function(point, event)
    // {
    //
    //     this.point = point;
    //     this.event = event;
    // };
    //
    //
    // MouseEvent.prototype.getMouse = function(graphWinObj)
    // {
    //
    //     var x = this.point.getAttribute(this.point.x);
    //     var y = this.point.getAttribute(this.point.y);
    //     var coords = "X coords: " + x + ", Y coords: " + y;
    //     return coords;
    // };


//End of Main Function
});