
/**
 * Created by zain on 11/11/2016.
 */



let GraphWinJs;
let Radius;
let Point;
let Line;
let Circle;
let Rectangle;
let Oval;
let Polygon;
let Text;
let Entry;
let Image;



/**
 *
 * @returns {string} txt
 */
function getHtmlTemplate() {
    let txt = "";
    txt += "<Style> svg, body{width: 100%; height: 100%;} </style>";
    return txt;
}



/**
 *
 * @type {{new(title?, width?, height?)=>{setCoords: (()), height, height, checkMouse: (()), checkKey: (()),
 * width, width, plot: (()), getMouse: (()), close: (()), title, title, plotPixel: (()), getKey: (()),
 * setTitle: ((title)), setBackground: ((background))}}}
 */
GraphWinJs = class {

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    constructor (title, width, height) {

        if (title === undefined) {
            title = "Graphics Window";
        }
        if (width === undefined) {
            width = 300;
        }
        if (height === undefined) {
            height = 300;
        }

        //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals (interpolation)
        let windowOptions = `width=${width}, height=${height},  top=400, left=400`;
        let tabId = Math.random();
        this.tabId = tabId;
        this.windw = window.open("about:blank", tabId, windowOptions);


        this.doc = this.windw.document;
        this.doc.write(getHtmlTemplate() + "<svg id=\"mySvg\"></svg>");
        this.setTitle(title);
        this.svg = $(this.doc).find("#mySvg").first();
        this.windw.document.close();

        /**
         *
         * @param e
         * @constructor
         * keep track of mouse position in !other! window!
         */
        $(this.windw).mousedown(function (e) {
            this.mousePosition = {};
            this.mousePosition.X = e.pageX;
            this.mousePosition.Y = e.pageY;
            console.log("This is mouse X and Y ", this.mousePosition);
        });

    }

    setTitle (title) {
        $(this.doc).find("Head").append("<title>" + title + "</title>");
    }

    close () {
        this.windw.close();
    }

    setBackground (background) {
        let svg = this.doc.getElementsByTagName("svg")[0]; //Get svg element
        svg.style.backgroundColor = background;
    }

    getMouse () {
        let handleClick = function () {
            this.resolve(this._this.windw.mousePosition);
        };

        let asyncPromiseFunc = function (resolve, reject) {
            try {
                let boundToPromise = handleClick.bind({resolve: resolve, reject: reject, _this: this});
                $(this.windw.document.body).click(boundToPromise);
            }
            catch (e) {
                reject(e);
            }
        };

        return new Promise(asyncPromiseFunc.bind(this));
    }

    checkMouse () {
        console.log(this.windw.mousePosition);
        return this.windw.mousePosition;
    }

    getKey  () {
        let handleKey = function (eventData) {
            this.resolve(eventData.key);
            console.log(eventData.key);
        };

        let asyncPromiseFunc = function (resolve, reject) {
            try {
                let boundToPromise = handleKey.bind({resolve: resolve, reject: reject, _this: this});
                $(this.windw).keypress(boundToPromise);
            }
            catch (e) {
                reject(e);
            }
        };

        return new Promise(asyncPromiseFunc.bind(this));
    }

    checkKey () {
        console.log(this.windw.keyPressed);
        return this.windw.keyPressed;
    }

    //Least Important
    plot () {
    }

    plotPixel () {
    }

    setCoords () {
    }

};



/**
 *
 * @type {{new(radius?)=>{radius, radius}}}
 */
Radius = class {

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }

    constructor(radius) {

        if (radius === undefined) {
            throw ("Radius needs radius");
        }
        this.radius = radius;
        this.domObj = null;

        this.pointModelObj = document.createElementNS("http://www.w3.org/2000/svg", "radius");
    }

    getRadius() {
        return this.radius;
    }

};



/**
 *
 * @type {{new(x?, y?)=>{getY: (()), __insertIfNeeded: ((domElem?, graphWinObj)),
 * draw: ((graphWinObj?)), getX: (()), undraw: ((graphWinObj)), x, x, y, y}}}
 */
Point = class {

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    constructor(x, y) {

        if (x === undefined || y === undefined) {
            throw ("Point needs x and y coordinates");
        }

        else if(x instanceof Array) {
        }

        this._x = x;
        this._y = y;
        this.domObj = null;
        this.pointModelObj = document.createElementNS("http://www.w3.org/2000/svg", "point");
    }

    draw(graphWinObj) {
        this.pointModelObj.setAttribute("x1", this._x);
        this.pointModelObj.setAttribute("y1", this._y);
        this.__insertIfNeeded(this.pointModelObj, graphWinObj);
    }

    __insertIfNeeded(domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw(graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setFill(fill) {
        this.pointModelObj.style.fill = fill;
    }

    setOutline (stroke) {
        this.pointModelObj.style.stroke = stroke;
    }

    setWidth (width) {
        this.pointModelObj.style.strokeWidth = width;
    }

    move (dx, dy) {
        this.pointModelObj.setAttribute("x1", dx);
        this.pointModelObj.setAttribute("x2", dy);
    }

    clone() {
        let pointCopy = {};
        Object.setPrototypeOf(pointCopy, this.__proto__);
        pointCopy = Object.assign(pointCopy, this);
        pointCopy.domObj = null;
        pointCopy.pointModelObj = null;
        console.log("copy/clone", pointCopy);
        return pointCopy;
    }

};



/**
 *
 * @type {{new(point1?, point2?)=>{point2, point2, point1, point1, getCenter: (()),
 * draw: ((graphWinObj?)), _insertIfNeeded: ((domElem?, graphWinObj)), setOutline: ((stroke)), getP1: (()),
 * clone: (()), setWidth: ((width)), getP2: (()), move: ((dx?, dy?)), setArrow: (()), undraw: ((graphWinObj))}}}
 */
Line = class {

    get point1() {
        return this._point1;
    }

    set point1(value) {
        this._point1 = value;
    }

    get point2() {
        return this._point2;
    }

    set point2(value) {
        this._point2 = value;
    }

    constructor (point1, point2) {

        if (point1 === undefined) {
            throw ("A  Line needs coordinates");
        }
        if (point2 === undefined) {
            throw ("A  Line needs coordinates");
        }

        this.point1 = point1;
        this.point2 = point2;
        this.domObj = null;

        this.lineModelObj = document.createElementNS("http://www.w3.org/2000/svg", "line");

        //custom default settings
        this.lineModelObj.style.stroke = "#000"; //black
        this.lineModelObj.style.strokeWidth = 1;

    }

    draw (graphWinObj) {
        this.lineModelObj.setAttribute("x1", this.point1.x);
        this.lineModelObj.setAttribute("y1", this.point1.y);
        this.lineModelObj.setAttribute("x2", this.point2.x);
        this.lineModelObj.setAttribute("y2", this.point2.y);
        this.__insertIfNeeded(this.lineModelObj, graphWinObj);
    }

    __insertIfNeeded(domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw (graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    //need to do
    setArrow () {
    }

    getCenter () {
        /**
         *
         * Formula to get Mid Point of Line using Points
         */
        let P1 = ((this.point1.x + this.point2.x) / 2);
        let P2 = ((this.point1.y + this.point2.y) / 2);

        return new Point(P1, P2);
    }

    getP1 () {
        // Returns a clone of the corresponding endpoint of the segment.
        return new Point(this.point1.x, this.point1.y);
    }

    getP2 () {
        // Returns a clone of the corresponding endpoint of the segment.
        return new Point(this.point2.x, this.point2.y);
    }

    setFill(fill) {
        this.lineModelObj.style.fill = fill;
    }

    setOutline (stroke) {
        this.lineModelObj.style.stroke = stroke;
    }

    setWidth (width) {
        this.lineModelObj.style.strokeWidth = width;
    }

    move (dx, dy) {
        this.lineModelObj.setAttribute("x1", dx);
        this.lineModelObj.setAttribute("x2", dy);
    }

    clone() {
        let lineCopy = {};
        Object.setPrototypeOf(lineCopy, this.__proto__);
        lineCopy = Object.assign(lineCopy, this);
        lineCopy.domObj = null;
        lineCopy.lineModelObj = null;
        console.log("copy/clone", lineCopy);
        return lineCopy;
    }

};



/**
 *
 * @type {{new(point?, radius?)=>{getCenter: (()), draw: ((graphWinObj?)), setOutline: ((stroke)),
 * point, point, getP1: (()), getP2: (()), setWidth: ((width)), __insertIfNeeded: ((domElem?, graphWinObj)),
 * move: ((dx?, dy?)), getRadius: (()), undraw: ((graphWinObj)), clone: (()), radius, radius, setFill: ((fill))}}}
 */
Circle = class {

    get point() {

        return this._point;
    }

    set point(value) {
        this._point = value;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }

    constructor(point, radius) {

        if (point === undefined || point.x === undefined || point.y === undefined)
            throw ("A circle needs Point x and Point y coordinates");
        if (radius === undefined) {
            throw ("A circle needs radius");
        }

        this.point = point;
        this.radius = radius;
        this.domObj = null;

        this.circleModelObj = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        //custom default settings
        this.circleModelObj.style.stroke = "#000"; //black
        this.circleModelObj.style.fill = "transparent";
        this.circleModelObj.style.strokeWidth = 1;
    }

    draw(graphWinObj) {
        this.circleModelObj.setAttribute("cx", this.point.x);
        this.circleModelObj.setAttribute("cy", this.point.y);
        this.circleModelObj.setAttribute("r", this.radius);

        this.__insertIfNeeded(this.circleModelObj, graphWinObj);
    }

    __insertIfNeeded(domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw(graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    getCenter() {
        // Returns a clone of the center point of the circle
        return new Point(this.point.x, this.point.y);
    }

    getRadius() {
        return new Radius(this.radius);
    }

    getP1() {
        // Returns a clone of the corresponding corner of the circle's bounding box.
        // These are opposite corner points of a square that circumscribes the circle.

        let P1x = this.point.x - 10;
        let P1y = this.point.y - 10;

        return new Point(P1x, P1y);
    }

    getP2() {
        // Returns a clone of the corresponding corner of the circle's bounding box.
        // These are opposite corner points of a square that circumscribes the circle.

        let P2x = this.point.x + 10;
        let P2y = this.point.y + 10;

        return new Point(P2x, P2y);
    }

    setFill(fill) {
        this.circleModelObj.style.fill = fill;
    }

    setOutline(stroke) {
        this.circleModelObj.style.stroke = stroke;
    }

    setWidth(width) {
        this.circleModelObj.style.strokeWidth = width;
    }

    move(dx, dy) {
        this.circleModelObj.setAttribute("cx", dx);
        this.circleModelObj.setAttribute("cx", dy);
    }

    clone() {
        let circleCopy = {};
        Object.setPrototypeOf(circleCopy, this.__proto__);
        circleCopy = Object.assign(circleCopy, this);
        circleCopy.domObj = null;
        circleCopy.circleModelObj = null;
        console.log("copy/clone", circleCopy);
        return circleCopy;
    }

};



/**
 *
 * @type {{new(point1?, point2?)=>{point2, point2, point1, point1, getCenter: (()), draw: ((graphWinObj?)),
 * setOutline: ((stroke)), getP1: (()), getP2: (()), setWidth: ((width)), __insertIfNeeded: ((domElem?, graphWinObj)),
 * move: ((dx?, dy?)), undraw: ((graphWinObj)), clone: (()), setFill: ((fill))}}}
 */
Rectangle = class {

    get point1() {
        return this._point1;
    }

    set point1(value) {
        this._point1 = value;
    }

    get point2() {
        return this._point2;
    }

    set point2(value) {
        this._point2 = value;
    }

    constructor (point1, point2) {

        if (point1 === undefined) {
            throw ("A rectangle needs points");
        }
        if (point2 === undefined) {
            throw ("A rectangle needs points");
        }

        this.point1 = point1;
        this.point2 = point2;
        this.domObj = null;

        this.recModelObj = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        //custom default settings
        this.recModelObj.style.stroke = "#000"; //black
        this.recModelObj.style.fill = "transparent";
        this.recModelObj.style.strokeWidth = 1;
    }

    draw (graphWinObj) {
        this.recModelObj.setAttribute("x", (this.point1.x, this.point2.x));
        this.recModelObj.setAttribute("y", (this.point1.y, this.point2.y));

        let width = Math.max(this.point1.x, this.point2.x) - Math.min(this.point1.x, this.point2.x);
        let height = Math.max(this.point1.y, this.point2.y) - Math.min(this.point1.y, this.point2.y);

        this.recModelObj.setAttribute("width", width);
        this.recModelObj.setAttribute("height", height);
        this.__insertIfNeeded(this.recModelObj, graphWinObj);
    }

    __insertIfNeeded (domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw (graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    getCenter () {
        /**
         *
         * Formula to get Mid Point of Rectangle using Points
         */

        let P1 = ((this.point1.x + this.point2.x) / 2);
        let P2 = ((this.point1.y + this.point2.y) / 2);

        return new Point(P1, P2);
    }

    getP1 () {
        // Returns a clone of the corresponding endpoint of the segment.
        return new Point(this.point1.x, this.point1.y);
    }

    getP2 () {
        // Returns a clone of the corresponding endpoint of the segment.
        return new Point(this.point2.x, this.point2.y);
    }

    setFill (fill) {
        this.recModelObj.style.fill = fill;
    }

    setOutline (stroke) {
        this.recModelObj.style.stroke = stroke;
    }

    setWidth (width) {
        this.recModelObj.style.strokeWidth = width;
    }

    move (dx, dy) {
        this.recModelObj.setAttribute("x", dx);
        this.recModelObj.setAttribute("y", dy);
    }

    clone () {
        let rectangleCopy = {};
        Object.setPrototypeOf(rectangleCopy, this.__proto__);
        rectangleCopy = Object.assign(rectangleCopy, this);
        rectangleCopy.domObj = null;
        rectangleCopy.rectangleModelObj = null;
        console.log("copy/clone", rectangleCopy);
        return rectangleCopy;
    }

};



/**
 *
 * @type {{new(point1?, point2?)=>{point2, point2, point1, point1, getCenter: (()), draw: ((graphWinObj?)),
 * setOutline: ((stroke)), getP1: (()), getP2: (()), setWidth: ((width)), __insertIfNeeded: ((domElem?, graphWinObj)),
  * move: ((dx, dy)), undraw: ((graphWinObj)), clone: (()), setFill: ((fill))}}}
 */
Oval = class {

    get point1() {
        return this._point1;
    }

    set point1(value) {
        this._point1 = value;
    }

    get point2() {
        return this._point2;
    }

    set point2(value) {
        this._point2 = value;
    }

    constructor (point1, point2) {

        if (point1 === undefined) {
            throw ("A Oval needs Point x and Point y coordinates");
        }
        if (point2 === undefined) {
            throw ("A Oval needs Point x and Point y coordinates");
        }

        this.point1 = point1;
        this.point2 = point2;
        this.domObj = null;

        this.ovalModelObj = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");

        //custom default settings
        this.ovalModelObj.style.stroke = "#000"; //black
        this.ovalModelObj.style.fill = "transparent";
        this.ovalModelObj.style.strokeWidth = 1;
    }

    draw (graphWinObj) {
        this.ovalModelObj.setAttribute("cx", this.point1.x);
        this.ovalModelObj.setAttribute("cy", this.point1.y);
        this.ovalModelObj.setAttribute("rx", this.point2.x);
        this.ovalModelObj.setAttribute("ry", this.point2.y);

        this.__insertIfNeeded(this.ovalModelObj, graphWinObj);
    }

    __insertIfNeeded (domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw (graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    getCenter () {
        // Returns a clone of the corresponding endpoint of the segment.

        //formula to get center
        let Px = ((this.point1.x + this.point2.x) / 2);
        let Py = ((this.point1.y + this.point2.y) / 2);

        console.log("get center ab", new Point(Px, Py));
        return new Point(Px, Py);
    }

    getP1 () {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log("get p1 ab", new Point(this.point1.x, this.point1.y));
        return new Point(this.point1.x, this.point1.y);
    }

    getP2 () {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log("get p2 ab", new Point(this.point2.x, this.point2.y));
        return new Point(this.point2.x, this.point2.y);
    }

    setFill (fill) {
        this.ovalModelObj.style.fill = fill;
    }

    setOutline (stroke) {
        this.ovalModelObj.style.stroke = stroke;
    }

    setWidth (width) {
        this.ovalModelObj.style.strokeWidth = width;
    }

    move (dx, dy) {
        this.ovalModelObj.setAttribute("cx", dx);
        this.ovalModelObj.setAttribute("cy", dy);
    }

    clone () {
        let ovalCopy = {};
        Object.setPrototypeOf(ovalCopy, this.__proto__);
        ovalCopy = Object.assign(ovalCopy, this);
        ovalCopy.domObj = null;
        ovalCopy.ovalModelObj = null;
        console.log("copy/clone", ovalCopy);
        return ovalCopy;
    }

};



/**
 *
 * @type {{new()=>{getPoints: (()), clone: (()), setFill: ((fill)), __insertIfNeeded: ((domElem?, graphWinObj)),
 * move: ((dx?, dy?)), draw: ((graphWinObj?)), setWidth: ((width)), undraw: ((graphWinObj)), setOutline: ((stroke))}}}
 */
Polygon = class {

    constructor () {

        this.points = [];
        this.domObj = null;

        this.polygonModelObj = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

        //custom default settings
        this.polygonModelObj.style.stroke = "#000";
        this.polygonModelObj.style.fill = "transparent";
        this.polygonModelObj.style.strokeWidth = 1;

        //Adding Multiple Points (should take up to 12)

        if (arguments.length <= 12) {
            let args = Array.prototype.slice.call(arguments);
            console.log("this is arg", args);
            for(let i=0; i < args.length; i++) {
                this.points.push(args[i].getX());
                this.points.push(args[i].getY());
            }
        }
        else {
            throw("List of Points must not exceed 12");
        }
    }

    draw (graphWinObj) {
        this.polygonModelObj.setAttribute("points", this.points);
        this.__insertIfNeeded(this.polygonModelObj, graphWinObj);
    }

    __insertIfNeeded (domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw (graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    //need to do
    getPoints () {

    }

    setFill (fill) {
        this.polygonModelObj.style.fill = fill;
    }

    setOutline (stroke) {
        this.polygonModelObj.style.stroke = stroke;
    }

    setWidth (width) {
        this.polygonModelObj.style.strokeWidth = width;
    }

    move (dx, dy) {
        this.polygonModelObj.setAttribute("dx", dx);
        this.polygonModelObj.setAttribute("dx", dy);
    }

    //DOES NOT WORK
    //depend on getPoints
    clone () {
        //not working (need to do getPoints method first)
        let polygonCopy = {};
        Object.setPrototypeOf(polygonCopy, this.__proto__);
        polygonCopy = Object.assign(polygonCopy, this);
        polygonCopy.domObj = null;
        polygonCopy.polygonModelObj = null;
        console.log("copy/clone", polygonCopy);
        return polygonCopy;
    }

};



/**
 *
 * @type {{new(point?, text)=>{getText: (()), setTextColor: {(fill), (fillTextColor)}, text, text, setStyle: ((style)),
 * setText: ((text)), draw: ((graphWinObj?)), setOutline: ((stroke)), setFace: ((fontFace)), point, point,
 * move: ((dx?, dy?)), __insertIfNeeded: ((domElem?, graphWinObj)), setSize: ((textFontSize)),
 * getAnchor: (()), clone: (()), undraw: ((graphWinObj))}}}
 */
Text = class {

    get point() {
        return this._point;
    }

    set point(value) {
        this._point = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    constructor (point, text){

        if (point === undefined) {
            throw ("A  Text needs cords");
        }
        if (text === undefined) {
            throw ("Need a String (Text)");
        }

        this.point = point;
        this.text = text;
        this.domObj = null;

        this.textModelObj = document.createElementNS("http://www.w3.org/2000/svg", "text");

        //custom default settings
        this.textModelObj.textContent = this.text;
        this.textModelObj.style.fill = "black";
        this.textModelObj.style.fontFamily = "arial";
        this.textModelObj.style.fontSize = 100;
    }

    draw (graphWinObj) {
        this.textModelObj.setAttribute("x", this.point.x);
        this.textModelObj.setAttribute("y", this.point.y);
        this.__insertIfNeeded(this.textModelObj, graphWinObj);
    }

    __insertIfNeeded (domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw (graphWinObj) {

        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    setOutline (stroke) {
        this.textModelObj.style.stroke = stroke;
    }

    setText (text) {
        this.textModelObj.textContent = text;
    }

    getText () {
        return this.textModelObj.textContent;
    }

    getAnchor () {
        //Returns a clone of the corresponding endpoint of the segment.
        return new Point(this.point.x, this.point.y);
    }

    setFace (fontFace) {
        this.textModelObj.style.fontFamily = fontFace;
    }

    setSize (textFontSize) {
        if (textFontSize >= 5 && textFontSize <= 35) {
            this.textModelObj.style.fontSize = textFontSize + "px";
        }
        else {
            console.log("Please enter a number between 5 and 35");
        }
    }

    setStyle (style) {

        if (style === "normal")
        {
            this.textModelObj.style.fontFamily = "arial";
        }
        else if (style === "bold")
        {
            this.textModelObj.style.fontWeight = style;
        }
        else if (style == "bold italic") {
            this.textModelObj.style.fontWeight = "bold";
            this.textModelObj.style.fontStyle = "italic";
        }
        else
        {
            this.textModelObj.style.fontStyle = style;
        }
    }

    setTextColor (fillTextColor) {
        this.textModelObj.style.fill = fillTextColor;
    }

    setFill (fill) {
        this.textModelObj.style.fill = fill;
    }


    setWidth (width) {
        this.textModelObj.style.strokeWidth = width;
    }

    move (dx, dy) {
        this.textModelObj.setAttribute("dx", dx);
        this.textModelObj.setAttribute("dx", dy);
    }

    clone () {
        let TextCopy = {};
        Object.setPrototypeOf(TextCopy, this.__proto__);
        TextCopy = Object.assign(TextCopy, this);
        TextCopy.domObj = null;
        TextCopy.textModelObj = null;
        console.log("copy/clone", TextCopy);
        return TextCopy;
    }

};



/**
 *
 * @type {{new(point?, radius?)=>{getText: (()), setTextColor: ((fillTextColor)), setStyle: ((style)),
 * setText: ((text?)), draw: ((graphWinObj?)), setOutline: ((stroke)), setFace: ((fontFace)), point,
 * point, move: ((dx?, dy?)), __insertIfNeeded: ((domElem?, graphWinObj)), setSize: ((textFontSize)),
 * getRadius: (()), undraw: ((graphWinObj)), getAnchor: (()), clone: (()), radius, radius, setFill: ((fill))}}}
 */
Entry = class {

    get point() {

        return this._point;
    }

    set point(value) {
        this._point = value;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }

    constructor (point, radius) {

        if (point === undefined || point.x === undefined) {
            throw ("Entry needs x and y coordinates");
        }
        if (radius === undefined) {
            throw ("Entry need radius");
        }

        this.point = point;
        this.radius = radius;

        this.domObj = null;

        this.entryModelObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");

        //custom default settings
        this.entryModelObj.setAttribute("width", "300");
        this.entryModelObj.setAttribute("height", "100");
        this.entryModelObj.textContent = this.text;
        this.entryModelObj.style.fill = "black";
        this.entryModelObj.style.fontFamily = "arial";
        // this.textModelObj.style.fontSize = "normal";
        let textInput = document.createElement("input");
        this.entryModelObj.appendChild(textInput);
    }

    draw (graphWinObj) {
        this.entryModelObj.setAttribute("x", this.point.x);
        this.entryModelObj.setAttribute("y", this.point.y);
        this.entryModelObj.setAttribute("r", this.width);

        let textInput = this.entryModelObj.getElementsByTagName("input")[0];
        this.__insertIfNeeded(this.entryModelObj, graphWinObj);

        textInput.focus();
    }

    __insertIfNeeded (domElem, graphWinObj) {
        if ($(graphWinObj.svg).find(domElem).length === 0) {
            //Dom obj not found inside window
            $(graphWinObj.svg).append(domElem);
            this.domObj = domElem;
        }
    }

    undraw (graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    setFill (fill) {
        this.entryModelObj.style.fill = fill;
    }

    setOutline (stroke) {
        this.entryModelObj.style.stroke = stroke;
    }

    getAnchor () {
        // Returns a clone of the corresponding endpoint of the segment.
        return new Point(this.point.x, this.point.y);
    }

    getRadius () {
        return new Radius(this.radius);
    }

    setText (text) {
        console.log(this.entryModelObj.getElementsByTagName("input")[0].value = text);
        this.entryModelObj.getElementsByTagName("input")[0].value = text;
    }

    getText () {
        console.log(this.entryModelObj.getElementsByTagName("input")[0].value);
        return this.entryModelObj.getElementsByTagName("input")[0].value;
    }

    setFace (fontFace) {
        this.textModelObj.style.fontFamily = fontFace;
    }

    setSize (textFontSize) {
        if (textFontSize >= 5 && textFontSize <= 35) {
            this.entryModelObj.style.fontSize = textFontSize + "px";
        }
        else {
            console.log("Please enter a number between 5 and 35");
        }
    }

    setStyle (style) {

        if (style === "normal")
        {
            this.textModelObj.style.fontFamily = "arial";
        }
        else if (style === "bold")
        {
            this.textModelObj.style.fontWeight = style;
        }
        else if (style == "bold italic") {
            this.textModelObj.style.fontWeight = "bold";
            this.textModelObj.style.fontStyle = "italic";
        }
        else
        {
            this.textModelObj.style.fontStyle = style;
        }
    }

    setTextColor (fillTextColor) {
        this.entryModelObj.style.fill = fillTextColor;
    }

    setWidth (width) {
        this.entryModelObj.style.strokeWidth = width;
    }

    move (dx, dy) {
        this.entryModelObj.setAttribute("x", dx);
        this.entryModelObj.setAttribute("y", dy);
    }

    clone () {
        let EntryCopy = {};
        Object.setPrototypeOf(EntryCopy, this.__proto__);
        EntryCopy = Object.assign(EntryCopy, this);
        EntryCopy.domObj = null;
        EntryCopy.entryModelObj = null;
        console.log("copy/clone", EntryCopy);
        return EntryCopy;
    }

};



/**
 *
 * @type {{new(point?, imageSrc)=>{getImage: (()), move: ((dx?, dy?)), getWidth: (()),
 * __insertIfNeeded: ((domElem?, graphWinObj)), getHeight: (()), draw: ((graphWinObj?)), point, point, imageSrc,
 * imageSrc, getAnchor: (()), clone: (()), undraw: ((graphWinObj))}}}
 */
Image = class {

    get point() {
        return this._point;
    }

    set point(value) {
        this._point = value;
    }

    get imageSrc() {
        return this._imageSrc;
    }

    set imageSrc(value) {
        this._imageSrc = value;
    }

    constructor (point, imageSrc){
        if (point === undefined)
            throw ("A image needs points");
        this.point = point;
        this.imageSrc = imageSrc;

        this.imgModelObj = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.domObj = null;
    }

    draw (graphWinObj) {
        this.imgModelObj.setAttribute("width", this.point.x);
        this.imgModelObj.setAttribute("height", this.point.y);
        this.imgModelObj.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.imageSrc);

        this.__insertIfNeeded(this.imgModelObj, graphWinObj);
    }

    __insertIfNeeded (domElem, graphWinObj) {
        let $svg = $(graphWinObj.windw.document).find("svg");
        if ($svg.find(domElem).length === 0) {
            //Dom obj not found inside window
            $svg.append(domElem);
            this.domObj = domElem;
        }

        // if($(graphWinObj.svg).find(domElem).length == 0) {
        //     //Dom obj not found inside window
        //     $(graphWinObj.svg).append(domElem);
        //     this.domObj = domElem;
        // }
    }

    undraw (graphWinObj) {
        if (this.domObj != null) {
            if ($(graphWinObj.svg).find(this.domObj).length == 1) {
                $(graphWinObj.svg).find(this.domObj).remove();
            }
        }
    }

    //DOES NOT WORK
    getWidth () {
        console.log("width ", this.point.x);
        return this.point.x;
    }

    //DOES NOT WORK
    getHeight () {
        console.log("height ", this.point.y);
        return this.point.y;
    }

    getAnchor () {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log(new Point(this.point.x, this.point.y));
        return new Point(this.point.x, this.point.y);
    }

    //DOES NOT WORK
    getImage () {
        // Returns a clone of the corresponding endpoint of the segment.
        console.log((this.imageSrc));
        return this.imageSrc;
    }

    move (dx, dy) {
        this.imgModelObj.setAttribute("x", dx);
        this.imgModelObj.setAttribute("y", dy);
    }

    //DOES NOT WORK
    clone () {
        //not working (need to do getPoints method first)
        let ImageCopy = {};
        Object.setPrototypeOf(ImageCopy, this.__proto__);
        ImageCopy = Object.assign(ImageCopy, this);
        ImageCopy.domObj = null;
        ImageCopy.imgModelObj = null;
        console.log("copy/clone", ImageCopy);
        return ImageCopy;
    }

};


