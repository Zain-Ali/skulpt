
/**
 * Created by zain on 11/11/2016.
 */

var GraphWinJs;
var Radius;
var Point;
var Circle;
var Rectangle;
var Line;
var Oval;
var Polygon;
var Text;
var Entry;
var Image;



//modelOBJ name is used because its generic and can be used for super class




function getHtmlTemplate()
{
    var txt = "";
    txt += "<Style> svg, body{width: 100%; height: 100%;} </style>";
    return txt;
}



$(function()
{
    /**
     *
     * @param title
     * @param width
     * @param height
     * @constructor
     */
    GraphWinJs = function(title, width, height)
    {
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
        //remove svg window obj from dom
        this.windw.close();
    };


    //PlaceHolder for Future Interactive Functionality
    GraphWinJs.prototype.setBackground = function(background)
    {
        //this.windw.style.background('fill', 'pink');
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
        // window.addEventListener("click", function () {
        //     console.log("log");
        // });
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



    /**
     *
     * @param radius
     * @constructor
     */
    Radius = function(radius)
    {
        if(radius == undefined)
            throw ("radius class needs radius");
        this.radius = radius;
        this.domObj = null;

        this.pointModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'radius');
    };


    Radius.prototype.getRadius = function()
    {
        console.log(this.radius);
        return this.radius;
    };




    /**
     *
     * @param x
     * @param y
     * @constructor
     */
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



    /**
     *
     * @param point1
     * @param point2
     * @constructor
     */
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

        //custom default settings
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


    Line.prototype.setArrow = function()
    {

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
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point(this.point1.x, this.point1.y));
        return new Point(this.point1.x, this.point1.y);
    };


    Line.prototype.getP2 = function()
    {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point(this.point2.x, this.point2.y));
        return new Point(this.point2.x, this.point2.y);
    };


    Line.prototype.setOutline = function(stroke)
    {
        this.lineModelObj.style.stroke = stroke;
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
        let lineCopy = {};
        Object.setPrototypeOf(lineCopy, this.__proto__);
        lineCopy = Object.assign(lineCopy, this);
        lineCopy.domObj = null;
        lineCopy.lineModelObj = null;
        console.log("copy/clone", lineCopy);
        return lineCopy;
    };



    /**
     *
     * @param point
     * @param radius
     * @constructor
     */
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

        //custom default settings
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


    Circle.prototype.getCenter = function()
    {
        // Returns a clone of the center point of the circle

        console.log(new Point(this.point.x, this.point.y));
        return new Point(this.point.x, this.point.y);
    };


    Circle.prototype.getRadius = function()
    {
         console.log(new Radius (this.radius));
         return new Radius (this.radius);
    };


    Circle.prototype.getP1 = function()
    {
        // Returns a clone of the corresponding corner of the circle's bounding box.
        // These are opposite corner points of a square that circumscribes the circle.

        // var P1x = this.point.x - this.radius;
        // var P1y = this.point.y - this.radius;

        var P1x = this.point.x;
        var P1y = this.point.y;

        console.log("P1 of Circle",new Point(P1x, P1y));
        return new Point(P1x, P1y);
    };


    Circle.prototype.getP2 = function()
    {
        // Returns a clone of the corresponding corner of the circle's bounding box.
        // These are opposite corner points of a square that circumscribes the circle.

        // var P2x = this.point.x + this.radius;
        // var P2y = this.point.y + this.radius;

        var P2x = this.point.x;
        var P2y = this.point.y;

        console.log("P2 of Circle", new Point(P2x, P2y));
        return new Point(P2x, P2y);
    };


    Circle.prototype.setFill = function(fill)
    {
        this.circleModelObj.style.fill = fill;
    };


    Circle.prototype.setOutline = function(stroke)
    {
        this.circleModelObj.style.stroke = stroke;
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
        let circleCopy = {};
        Object.setPrototypeOf(circleCopy, this.__proto__);
        circleCopy = Object.assign(circleCopy, this);
        circleCopy.domObj = null;
        circleCopy.circleModelObj = null;
        console.log("copy/clone", circleCopy);
        return circleCopy;
    };



    /**
     *
     * @param point1
     * @param point2
     * @constructor
     */
    Rectangle = function (point1, point2)
    {
        if (point1 == undefined || point2 == undefined)
            throw ('A rectangle needs points');
        this.point1 = point1;
        this.point2 = point2;
        this.domObj = null;

        this.recModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

        //custom default settings
        this.recModelObj.style.stroke = '#000'; //black
        this.recModelObj.style.fill = 'transparent';
        this.recModelObj.style.strokeWidth = 1;
    };


    Rectangle.prototype.draw = function(graphWinObj)
    {
        this.recModelObj.setAttribute('x', Math.min(this.point1.x, this.point2.x));
        this.recModelObj.setAttribute('y', Math.min(this.point1.y, this.point2.y));

        var width = Math.max(this.point1.x, this.point2.x) - Math.min(this.point1.x, this.point2.x);
        var height = Math.max(this.point1.y, this.point2.y) - Math.min(this.point1.y, this.point2.y);

        this.recModelObj.setAttribute('width', width);
        this.recModelObj.setAttribute('height', height);
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


    Rectangle.prototype.getCenter = function()
    {
        /**
         *
         * Formula to get Mid Point of Rectangle using Points
         */

        var P1 = ((this.point1.x + this.point2.x) / 2);
        var P2 = ((this.point1.y + this.point2.y) / 2);
        console.log(P1);
        console.log(P2);

        console.log(new Point(P1, P2));
        return new Point(P1, P2);

    };


    Rectangle.prototype.getP1 = function()
    {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point (this.point1.x, this.point1.y));
        return new Point(this.point1.x, this.point1.y);
    };


    Rectangle.prototype.getP2 = function()
    {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point (this.point2.x, this.point2.y));
        return new Point(this.point2.x, this.point2.y);
    };


    Rectangle.prototype.setFill = function(fill)
    {
        this.recModelObj.style.fill = fill;
    };


    Rectangle.prototype.setOutline = function(stroke)
    {
        this.recModelObj.style.stroke = stroke;
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
        let rectangleCopy = {};
        Object.setPrototypeOf(rectangleCopy, this.__proto__);
        rectangleCopy = Object.assign(rectangleCopy, this);
        rectangleCopy.domObj = null;
        rectangleCopy.rectangleModelObj = null;
        console.log("copy/clone", rectangleCopy);
        return rectangleCopy;
    };



    /**
     *
     * @param point1
     * @param point2
     * @constructor
     */
    Oval = function(point1,  point2)
    {
        if(point1 == undefined)
            throw ('A Ellipse needs cords');
        if(point2 == undefined)
            point2 = new Point(20,20);
        this.point1 = point1;
        this.point2 = point2;
        this.domObj = null;

        this.ovalModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');

        //custom default settings
        this.ovalModelObj.style.stroke = '#000'; //black
        this.ovalModelObj.style.fill = 'transparent';
        this.ovalModelObj.style.strokeWidth = 1;
    };


    Oval.prototype.draw = function(graphWinObj)
    {
        this.ovalModelObj.setAttribute('cx', this.point1.x);
        this.ovalModelObj.setAttribute('cy', this.point1.y);
        this.ovalModelObj.setAttribute('rx', this.point2.x);
        this.ovalModelObj.setAttribute('ry', this.point2.y);

        this.__insertIfNeeded(this.ovalModelObj, graphWinObj);
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


    Oval.prototype.getCenter = function()
    {
        // Returns a clone of the corresponding endpoint of the segment.
        /**
         *
         * formula to get center
         * var V = $V( [ (x1+x2)/2, (y1+y2)/2 ] );
         */

        var Px = ((this.point1.x + this.point2.x) / 2);
        var Py = ((this.point1.y + this.point2.y) / 2);
        console.log("Px", Px);
        console.log("Py", Py);

        console.log(new Point(Px, Py));
        return new Point(Px, Py);
    };


    Oval.prototype.getP1 = function()
    {
        // Returns a clone of the corresponding endpoint of the segment.

        console.log(new Point(this.point1.x, this.point1.y));
        return new Point(this.point1.x, this.point1.y);
    };


    Oval.prototype.getP2 = function()
    {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point(this.point2.x, this.point2.y));
        return new Point(this.point2.x, this.point2.y);
    };


    Oval.prototype.setFill = function(fill)
    {
        this.ovalModelObj.style.fill = fill;
    };


    Oval.prototype.setOutline = function(stroke)
    {
        this.ovalModelObj.style.stroke = stroke;
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
        let ovalCopy = {};
        Object.setPrototypeOf(ovalCopy, this.__proto__);
        ovalCopy = Object.assign(ovalCopy, this);
        ovalCopy.domObj = null;
        ovalCopy.ovalModelObj = null;
        console.log("copy/clone", ovalCopy);
        return ovalCopy;
    };



    /**
     *
     * @constructor
     */
    Polygon = function()
    {
        this.points = [];
        this.domObj = null;

        this.polygonModelObj = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

        //custom default settings
        this.polygonModelObj.style.stroke = '#000';
        this.polygonModelObj.style.fill = 'transparent';
        this.polygonModelObj.style.strokeWidth = 1;

        //Adding Multiple Points (should take up to 12)
        var args = Array.prototype.slice.call(arguments);
        for(var i=0; i < args.length; i++) {
            this.points.push(args[i].getX());
            this.points.push(args[i].getY());
        }
    };


    Polygon.prototype.draw = function(graphWinObj)
    {
        this.polygonModelObj.setAttribute('points', this.points);
        this.__insertIfNeeded(this.polygonModelObj, graphWinObj);
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
        // Returns a clone of the corresponding endpoint of the segment.

        // console.log(new Point(this.points));
        // return (this.points);
    };


    Polygon.prototype.setFill = function(fill)
    {
        this.polygonModelObj.style.fill = fill;
    };


    Polygon.prototype.setOutline = function(stroke)
    {
        this.polygonModelObj.style.stroke = stroke;
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
        //not working (need to do getPoints method first)
        let polygonCopy = {};
        Object.setPrototypeOf(polygonCopy, this.__proto__);
        polygonCopy = Object.assign(polygonCopy, this);
        polygonCopy.domObj = null;
        polygonCopy.polygonModelObj = null;
        console.log("copy/clone", polygonCopy);
        return polygonCopy;
    };



    /**
     *
     * @param point
     * @param text
     * @constructor
     */
    Text = function(point, text)
    {
        if(point == undefined)
            throw ('A  needs cords');

        this.point = point;
        this.text = text;
        this.domObj = null;

        this.textModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'text');

        //custom default settings
        this.textModelObj.textContent = this.text;
        this.textModelObj.style.fill = 'black';
        this.textModelObj.style.fontFamily = "arial";
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


    Text.prototype.getAnchor = function (text)
    {
        // Returns a clone of the corresponding endpoint of the segment.

        console.log(new Point(this.point.x, this.point.y));
        return new Point(this.point.x, this.point.y);
    };


    Text.prototype.setFace = function (fontFace)
    {
        this.textModelObj.style.fontFamily = fontFace;
    };


    Text.prototype.setSize = function (textFontSize)
    {
        //doesn't work
        //size between 5 and 36
        this.textModelObj.style.fontSize = textFontSize;

    };


    Text.prototype.setStyle = function (style)
    {
        if (style === "bold")
        {
            this.textModelObj.style.fontWeight = style;
        }
        else
        {
            this.textModelObj.style.fontStyle = style;
        }
    };


    Text.prototype.setTextColor = function (fillTextColor)
    {
        this.textModelObj.style.fill = fillTextColor;
    };


    Text.prototype.move = function(dx, dy)
    {
        this.textModelObj.setAttribute('dx', dx);
        this.textModelObj.setAttribute('dx', dy);
    };


    Text.prototype.clone = function()
    {
        //not working (need to do getPoints method first)
        let TextCopy = {};
        Object.setPrototypeOf(TextCopy, this.__proto__);
        TextCopy = Object.assign(TextCopy, this);
        TextCopy.domObj = null;
        TextCopy.textModelObj = null;
        console.log("copy/clone", TextCopy);
        return TextCopy;
    };



    /**
     *
     * @param point
     * @param width
     * @constructor
     */
    Entry = function(point, width)
    {
        if(point == undefined || point.x == undefined)
            throw ('A point needs cords');
        if(width == undefined)
            width = 20;
        this.point = point;
        this.width = width;
        this.domObj = null;

        this.entryModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'foreignObject');

        //custom default settings
        this.entryModelObj.setAttribute("width", "300");
        this.entryModelObj.setAttribute("height", "100");
        this.entryModelObj.textContent = this.text;
        this.entryModelObj.style.fill = 'black';
        this.entryModelObj.style.fontFamily = "arial";
        //this.textModelObj.style.fontSize = "normal";
        var textInput = document.createElement("input");
        this.entryModelObj.appendChild(textInput);
    };


    Entry.prototype.draw = function(graphWinObj)
    {
        this.entryModelObj.setAttribute("x", this.point.x);
        this.entryModelObj.setAttribute("y", this.point.y);

        var textInput =  this.entryModelObj.getElementsByTagName('input');//[0];
        textInput.size = this.width;

        this.__insertIfNeeded(this.entryModelObj, graphWinObj);
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


    Entry.prototype.setFill = function(fill)
    {
        this.entryModelObj.style.fill = fill;
    };


    Entry.prototype.setOutline = function(stroke)
    {
        this.entryModelObj.style.stroke = stroke;
    };


    Entry.prototype.getAnchor = function (text)
    {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point(this.point.x, this.point.y));
        return new Point(this.point.x, this.point.y);
    };


    Entry.prototype.getRadius = function()
    {
        console.log(new Radius (this.radius));
        return new Radius (this.radius);
    };


    Entry.prototype.setText = function (text)
    {
        this.entryModelObj.textContent = text;
    };


    Entry.prototype.getText = function ()
    {
        //doesn't work, returning original text not new setText
        console.log(this.text);
        return this.text;
    };


    Entry.prototype.setFace = function (fontFace)
    {
        this.textModelObj.style.fontFamily = fontFace;
    };


    Entry.prototype.setSize = function (textFontSize)
    {
        //doesn't work
        //size between 5 and 36
        this.entryModelObj.style.fontSize = textFontSize;

    };


    Entry.prototype.setStyle = function (style)
    {
        if (style === "bold")
        {
            this.entryModelObj.style.fontWeight = style;
        }
        else
        {
            this.entryModelObj.style.fontStyle = style;
        }
    };


    Entry.prototype.setTextColor = function (fillTextColor)
    {
        this.entryModelObj.style.fill = fillTextColor;
    };


    Entry.prototype.move = function(dx, dy)
    {
        this.entryModelObj.setAttribute('x', dx);
        this.entryModelObj.setAttribute('y', dy);
    };


    Entry.prototype.clone = function()
    {
        //not working (need to do getPoints method first)
        let EntryCopy = {};
        Object.setPrototypeOf(EntryCopy, this.__proto__);
        EntryCopy = Object.assign(EntryCopy, this);
        EntryCopy.domObj = null;
        EntryCopy.entryModelObj = null;
        console.log("copy/clone", EntryCopy);
        return EntryCopy;
    };



    /**
     *
     * @param point
     * @param imageSrc
     * @constructor
     */
    Image = function (point, imageSrc)
    {
        if (point == undefined)
            throw ('A image needs points');
        this.point = point;
        this.imageSrc = imageSrc;

        this.imgModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'image');

        this.domObj = null;
    };

    Image.prototype.draw = function(graphWinObj)
    {
        this.imgModelObj.setAttribute('width', this.point.x);
        this.imgModelObj.setAttribute('height', this.point.y);
        this.imgModelObj.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.imageSrc);
        this.__insertIfNeeded(this.imgModelObj, graphWinObj);
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


    Image.prototype.getWidth = function ()
    {
        console.log("width ", this.point.x );
        return this.point.x;
    };


    Image.prototype.getHeight = function ()
    {
        console.log("height ", this.point.y);
        return this.point.y;
    };


    Image.prototype.getAnchor = function (text)
    {
        // Returns a clone of the corresponding endpoint of the segment.

        console.log(new Point(this.point.x, this.point.y));
        return new Point(this.point.x, this.point.y);
    };


    Entry.prototype.move = function(dx, dy)
    {
        this.imgModelObj.setAttribute('x', dx);
        this.imgModelObj.setAttribute('y', dy);
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