
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
var GetText;


function getCanvases() {
    //let canvases = JSON.parse(localStorage.getItem('canvases'));
    let canvases = JSON.parse(sessionStorage.getItem('canvases'));
    canvases = canvases || [];
    return canvases;
}

function setCanvases(canvases) {
    //localStorage.setItem('canvases', JSON.stringify(canvases));
    sessionStorage.setItem('canvases', JSON.stringify(canvases));
}

function removeCurrentWindow(toRemove) {
    let canvases = getCanvases();
    // console.log('preSplice', canvases);
    let isIndex = function (currentId) {
        // console.log(`To remove ${toRemove} Current: ${currentId} Equal ${toRemove === currentId}`);
        return toRemove === currentId;
    };
    let index = canvases.findIndex(isIndex);
    if (index >= 0){
        canvases.splice(index, 1);
        // console.log('afterSplice', canvases);
        setCanvases(canvases);
    }
}


/*
*
*
*/

function getHtmlTemplate()
{
    var txt = "";
    txt += "<Style> svg, body{width: 100%; height: 100%;} </style>";

    return txt;
}

/*
* Temporary Supporting Function for KeyPress (To be Deleted)
*/
function KeyHandler() {
    var self = this;
    this._target   = getTarget();
    this._managers = {};
    this._handlers =
        {
            keypress : function(e)
            {
                self.onEvent("keypress", e);
            }
        };
    for (var key in this._handlers) {
        this._target.addEventListener(key, this._handlers[key]);
    }
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
        let canvases = getCanvases();


        if(title == undefined)
        {
            title = "Graphics Window";
        }
        if(width == undefined)
        {
            width = 300;
        }
        if(height == undefined)
        {
            height = 300;
        }

        //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals (interpolation)
        let windowOptions = `width=${width}, height=${height},  top=400, left=400`;
        let tabId = Math.random();
        this.tabId = tabId;
        this.windw = window.open('about:blank', tabId, windowOptions);


        canvases.push(tabId);
        // console.log('wasPushed', canvases);
        setCanvases(canvases);

        this.doc = this.windw.document;
        this.doc.write(getHtmlTemplate() + '<svg id="mySvg"></svg>');
        this.setTitle(title);
        this.svg = $(this.doc).find('#mySvg').first();
        this.windw.document.close();

        this.windw.addEventListener("beforeunload", function (e) {
            // console.log(e);
            removeCurrentWindow(this.tabId);
            // e.preventDefault();
        });

        this.windw.onbeforeunload = function() {
            window.sessionStorage.clear();
        };

        /**
         *
         * @param e
         * @constructor
         * keep track of mouse position in !other! window!
         */
        $(this.windw).mousedown(function(e){
            this.mousePosition = {};
            this.mousePosition.X = e.pageX;
            this.mousePosition.Y = e.pageY;
            console.log(this.mousePosition);
        });


    };


    GraphWinJs.prototype.setTitle = function(title){

        $(this.doc).find('Head').append('<title>'+ title +'</title>')
    };


    GraphWinJs.prototype.close = function()
    {
        removeCurrentWindow(this.tabId);
        this.windw.close();
    };


    GraphWinJs.prototype.setBackground = function(background)
    {
        var svg = this.doc.getElementsByTagName('svg')[0]; //Get svg element
        svg.style.backgroundColor = background;
    };


    GraphWinJs.prototype.getMouse = function()
    {
        var handleClick = function(){
            this.resolve(this._this.windw.mousePosition);
        };

        var asyncPromiseFunc = function(resolve, reject) {
            try{
                var boundToPromise = handleClick.bind({resolve: resolve, reject:reject, _this:this});
                $(this.windw.document.body).click(boundToPromise);
            }
            catch(e)
            {
                reject(e);
            }
        };

        return new Promise(asyncPromiseFunc.bind(this));
    };


    GraphWinJs.prototype.checkMouse = function()
    {
        return this.windw.mousePosition;
    };


    //not working
    GraphWinJs.prototype.getKey = function()
    {
        var handleKey = function(eventData){
            this.resolve(eventData.key);
            console.log(eventData.key);
        };

        var asyncPromiseFunc = function(resolve, reject) {
            try{
                var boundToPromise = handleKey.bind({resolve: resolve, reject:reject, _this:this});
                $(this.windw).keypress(boundToPromise);
            }
            catch(e)
            {
                reject(e);
            }
        };

        return new Promise(asyncPromiseFunc.bind(this));
    };



    GraphWinJs.prototype.checkKey = function()
    {
        return this.windw.keyPressed;
    };


    //Least Important
    GraphWinJs.prototype.plot = function()
    {

    };


    GraphWinJs.prototype.plotPixel = function()
    {

    };


    GraphWinJs.prototype.setCoords = function()
    {

    };
    //Least Important


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
     * @param text
     * @constructor
     */
    GetText = function(text)
    {
        if(text == undefined)
            throw ("radius class needs text");
        this.text = text;
        this.domObj = null;

        this.pointModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    };


    // GetText.prototype.getText = function()
    // {
    //     console.log(this.text);
    //     return this.text;
    // };


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
        this.recModelObj.setAttribute('x', (this.point1.x, this.point2.x));
        this.recModelObj.setAttribute('y', (this.point1.y, this.point2.y));

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

        var point1 = P1;
        var point2 = P2;

        //console.log(new Point(P1, P2));
        return new Point(point1, point2);

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
        debugger;

        var args = Array.prototype.slice.call(arguments);
        console.log("this is arg", args);
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
        console.log(new Point(this.points, this.points));
        return new Point(this.points, this.points);

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

    //DOES NOT WORK
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
            throw ('A  Text needs cords');

        this.point = point;
        this.text = text;
        this.domObj = null;

        this.textModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'text');

        //custom default settings
        this.textModelObj.textContent = this.text;
        this.textModelObj.style.fill = 'black';
        this.textModelObj.style.fontFamily = "arial";
        this.textModelObj.style.fontSize = 100;
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
        debugger;
        console.log(this.textModelObj.textContent = text);
        this.textModelObj.textContent = text;
    };


    Text.prototype.getText = function ()
    {

        console.log(new GetText(this.textModelObj.textContent));
        return new GetText(this.textModelObj.textContent);
    };


    Text.prototype.getAnchor = function (text)
    {
        //Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point(this.point.x, this.point.y));
        return new Point(this.point.x, this.point.y);
    };


    Text.prototype.setFace = function (fontFace)
    {
        this.textModelObj.style.fontFamily = fontFace;
    };


    Text.prototype.setSize = function (textFontSize)
    {
        if(textFontSize >= 5 && textFontSize <= 35)
        {
            this.textModelObj.style.fontSize = textFontSize + "px";
        }
        else
        {
            console.log("Please enter a number between 5 and 35");
        }
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


    //DOES NOT WORK
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
     * @param radius
     * @constructor
     */
    Entry = function(point, radius)
    {
        if(point == undefined || point.x == undefined)
            throw ('A point needs cords');
        if(radius == undefined)
            radius = 20;
        this.point = point;
        //this.width = width;
        this.radius = radius;

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
        //textInput.value = "hello";
        this.entryModelObj.appendChild(textInput);

    };


    Entry.prototype.draw = function(graphWinObj)
    {
        this.entryModelObj.setAttribute("x", this.point.x);
        this.entryModelObj.setAttribute("y", this.point.y);
        this.entryModelObj.setAttribute('r', this.radius);


        var textInput =  this.entryModelObj.getElementsByTagName('input')[0];
        //textInput.size = this.width;

        this.__insertIfNeeded(this.entryModelObj, graphWinObj);
        textInput.focus();
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


    Entry.prototype.getAnchor = function ()
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
        console.log("1", this.entryModelObj, text);
        this.entryModelObj.getElementsByTagName('input')[0].value = text;
    };


    Entry.prototype.getText = function ()
    {
        console.log(this.entryModelObj);
        console.log(this.entryModelObj.getElementsByTagName('input')[0].value);
        return this.entryModelObj.getElementsByTagName('input')[0].value;
    };


    Entry.prototype.setFace = function (fontFace)
    {
        this.textModelObj.style.fontFamily = fontFace;
    };


    Entry.prototype.setSize = function (textFontSize)
    {
        this.entryModelObj.style.fontSize = textFontSize + "px";
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

    //needs fixing for multiple window option
    Image.prototype.__insertIfNeeded = function(domElem, graphWinObj)
    {
        // //debugger;
        var $svg = $(graphWinObj.windw.document).find('svg');
        if($svg.find(domElem).length == 0) {
            //Dom obj not found inside window
            $svg.append(domElem);
            this.domObj = domElem;
        }

        // if($(graphWinObj.svg).find(domElem).length == 0) {
        //     //Dom obj not found inside window
        //     $(graphWinObj.svg).append(domElem);
        //     this.domObj = domElem;
        // }
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


    //DOES NOT WORK
    Image.prototype.getWidth = function ()
    {
        console.log((this.point.x));
        return this.point.x;
    };


    //DOES NOT WORK
    Image.prototype.getHeight = function ()
    {
        console.log("height ", this.point.y);
        return this.point.y;

    };


    Image.prototype.getAnchor = function ()
    {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point(this.point.x, this.point.y));
        return new Point(this.point.x, this.point.y);
    };


    //DOES NOT WORK
    Image.prototype.getImage = function ()
    {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log((this.imageSrc));
        return this.imageSrc;
    };



    Image.prototype.move = function(dx, dy)
    {
        this.imgModelObj.setAttribute('x', dx);
        this.imgModelObj.setAttribute('y', dy);
    };


    //DOES NOT WORK
    Image.prototype.clone = function()
    {
        //not working (need to do getPoints method first)
        let ImageCopy = {};
        Object.setPrototypeOf(ImageCopy, this.__proto__);
        ImageCopy = Object.assign(ImageCopy, this);
        ImageCopy.domObj = null;
        ImageCopy.imgModelObj = null;
        console.log("copy/clone", ImageCopy);
        return ImageCopy;
    };


//End of Main Function
});