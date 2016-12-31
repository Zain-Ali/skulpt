
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


    //not working
    GraphWinJs.prototype.setBackground = function(background)
    {
        this.windw.body.style.background = "red";
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
        this.domObj = null;

        this.circleModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        //custom default setting of colours
        this.circleModelObj.style.stroke = '#000'; //black
        this.circleModelObj.style.fill = 'transparent';

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
        this.domObj = null;

        this.recModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        //custom default setting of colours
        this.recModelObj.style.stroke = '#000'; //black
        this.recModelObj.style.fill = 'transparent';
    };


    Rectangle.prototype.draw = function(graphWinObj)
    {
        this.recModelObj.setAttribute('width', this.width);
        this.recModelObj.setAttribute('height', this.height);
        this.__insertIfNeeded(this.recModelObj, graphWinObj);
    };


    Rectangle.prototype.setFill = function(fill)
    {
        this.recModelObj.style.fill = fill;
    };


    Rectangle.prototype.setOutline = function(stroke)
    {
        this.recModelObj.style.stroke = stroke;
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

    };


    Line.prototype.draw = function(graphWinObj)
    {
        this.lineModelObj.setAttribute('x1', this.point1.x);
        this.lineModelObj.setAttribute('y1', this.point1.y);
        this.lineModelObj.setAttribute('x2', this.point2.x);
        this.lineModelObj.setAttribute('y2', this.point2.y);
        this.__insertIfNeeded(this.lineModelObj, graphWinObj);

    };


    Line.prototype.setOutline = function(stroke)
    {
        this.lineModelObj.style.stroke = stroke;
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
        this.domObj = null;

        this.ovalModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
        this.ovalModelObj.style.stroke = '#000'; //black
        this.ovalModelObj.style.fill = 'transparent';

    };


    Oval.prototype.draw = function(graphWinObj)
    {
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


    Oval.prototype.setFill = function(fill)
    {
        this.ovalModelObj.style.fill = fill;
    };


    Oval.prototype.setOutline = function(stroke)
    {
        this.ovalModelObj.style.stroke = stroke;
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



    //Not printing on the screen
    //Not Working for some reason
    Polygon = function(point1,  point2, point3)
    {
        if(point1 == undefined || point2 == undefined || point3 == undefined)
            throw ('A  needs cords');
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.domObj = null;

        this.polygonModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        this.polygonModelObj.style.stroke = '#000';
        this.polygonModelObj.style.fill = 'transparent';
    };

    Polygon.prototype.draw = function(graphWinObj)
    {
        this.polygonModelObj.setAttribute('x1', this.point1.x);
        this.polygonModelObj.setAttribute('y1', this.point1.y);
        this.polygonModelObj.setAttribute('x2', this.point2.x);
        this.polygonModelObj.setAttribute('y2', this.point2.y);
        this.polygonModelObj.setAttribute('x3', this.point3.x);
        this.polygonModelObj.setAttribute('y3', this.point3.y);


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
        this.domObj = null;

        this.textModelObj = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        this.textModelObj.style.stroke = '#000';
        this.textModelObj.style.fill = '#000';

    };


    Text.prototype.draw = function(graphWinObj)
    {
        this.textModelObj.setAttribute('x', this.point.x);
        this.textModelObj.setAttribute('y', this.point.y);
        this.textModelObj.textContent = this.text;
        this.__insertIfNeeded(this.textModelObj, graphWinObj);
    };


    //PLEASE NOTE: not setting text before draw method
    Text.prototype.setText = function (text)
    {
        debugger;
        this.textModelObj.textContent = text;
    };


    Text.prototype.setFill = function(fill)
    {
        this.textModelObj.style.fill = fill;
    };


    Text.prototype.setOutline = function(stroke)
    {
        this.textModelObj.style.stroke = stroke;
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
        this.entryModelObj.setAttribute("type", "text");


        this.__insertIfNeeded(this.entryModelObj, graphWinObj);
    };


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








//End of Main Function
});


