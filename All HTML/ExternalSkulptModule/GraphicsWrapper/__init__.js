/**
 * Created by zain on 11/11/2016.
 */



// This is a JavaScript and SVG wrapper class. Wrapping JS and SVG in Python
/**
 *
 * @param name
 * @returns {{}}
 */
let $builtinmodule = function(name){
    "use strict";
    let mod = {};

    let graphicsClass = {};
    let radiusClass = {};
    let pointClass = {};
    let circleClass = {};
    let rectangleClass = {};
    let lineClass = {};
    let ovalClass = {};
    let textClass = {};
    let polygonClass = {};
    let imageClass = {};
    let entryClass = {};


    /**
     *
     * @type {{__getattr__: Sk.builtin.func, __setattr__: Sk.builtin.func}}
     */
    let reuseingGetterSetter = {

        __getattr__ : new Sk.builtin.func(function (self, key) {

            if(self[key.v] !== undefined) { //everything is stored on self object
                self[key.v].v = self.modelObj[key.v]; //
                return self[key.v];
            }
            //else throw exception
        }),

        __setattr__: new Sk.builtin.func(function (self, key, value) {

            if(self[key.v] !== undefined) {
                self.modelObj[key.v] = value;
                return self[key.v] = value;
            }
            //else throw exception
        })
    };



    //P stand for Python
    mod.PGraphics = {};
    mod.PRadiusClass = {};
    mod.PPointClass = {};
    mod.PCircleClass = {};
    mod.PRectangleClass = {};
    mod.PLineClass = {};
    mod.PPolygonClass = {};
    mod.POvalClass = {};
    mod.PTextClass = {};
    mod.PImageClass = {};
    mod.PEntryClass = {};



    /**
     *
     * @param $glb
     * @param $loc
     */
    graphicsClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, title, width, height) {

            self.title = title;
            self.width = width;
            self.height = height;

            if (title === undefined) {
                title = "Graphics Window";
            }
            if(width === undefined) {
                width = 300;
            }
            if(height === undefined) {
                height = 300;
            }

            self.modelObj = new GraphWinJs(title.v, width.v, height.v);
            return self;

        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.close = new Sk.builtin.func(function(self) {
            self.modelObj.close();
        });

        $loc.setBackground = new Sk.builtin.func(function (self, background) {
            self.modelObj.setBackground(background.v);
        });

        $loc.getMouse = new Sk.builtin.func(function(self) {
            let susp = new Sk.misceval.Suspension();

            let promise = self.modelObj.getMouse();

            susp.resume = function () {
                if (susp.data["error"]) {
                    throw new Sk.builtin.IOError(susp.data["error"].message);
                } else {
                    let x = Sk.builtin.float_(susp.data["result"].X);
                    let y = Sk.builtin.float_(susp.data["result"].Y);
                    return Sk.misceval.callsim(mod.Point, x,y);
                }
            };

            susp.data = {
                type: "Sk.promise",
                promise: promise
            };
            return susp;

        });

        $loc.getKey = new Sk.builtin.func(function(self) {
            let susp = new Sk.misceval.Suspension();

            let promise = self.modelObj.getKey();

            susp.resume = function () {
                if (susp.data["error"]) {
                    throw new Sk.builtin.IOError(susp.data["error"].message);
                } else {
                    let pressedKey = Sk.builtin.str(susp.data["result"]);
                    return pressedKey;
                }
            };

            susp.data = {
                type: "Sk.promise",
                promise: promise
            };

            return susp;
        });

        $loc.checkMouse = new Sk.builtin.func(function (self) {
            return self.modelObj.checkMouse();
        });

        $loc.checkKey = new Sk.builtin.func(function (self) {
            return self.modelObj.checkKey();
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    radiusClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, radius) {
            self.modelObj = new Radius(radius.v);
            self.radius = radius;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.getRadius = new Sk.builtin.func(function (self) {
            let radius = self.modelObj.getRadius();
            let skulptRadius = Sk.builtin.float_(radius);
            return skulptRadius;

        });
    };

    /**
     *
     * @param $glb
     * @param $loc
     */
    pointClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, x, y) {
            self.modelObj = new Point(x.v, y.v);
            self.x = x;
            self.y = y;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        $loc.getX = new Sk.builtin.func(function(self) {
            let x = self.modelObj.getX();
            let skulptX = Sk.builtin.float_(x);
            return skulptX;
        });

        $loc.getY = new Sk.builtin.func(function(self) {
            let y = self.modelObj.getY();
            let skulptY = Sk.builtin.float_(y);
            return skulptY;
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setWidth = new Sk.builtin.func(function(self, width) {
            self.modelObj.setWidth(width.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            self.modelObj.move(dx.v, dy.v);
        });

        $loc.clone = new Sk.builtin.func(function(self) {
            let x = Sk.misceval.callsim(self.getX, self);
            let y = Sk.misceval.callsim(self.getY, self);
            let pyObj = Sk.misceval.callsim(mod.Point, x, y);

            return pyObj;
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    lineClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, point1, point2) {

            self.modelObj = new Line(point1.modelObj, point2.modelObj);
            self.point1 = point1;
            self.point2 = point2;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.getP1 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP1();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("this is pyOBJ", pyObj);
            return pyObj;
        });

        $loc.getP2 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP2();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            return pyObj;
        });

        $loc.getCenter = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getCenter();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("This is pyObj", pyObj);
            return pyObj;
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setWidth = new Sk.builtin.func(function(self, width) {
            self.modelObj.setWidth(width.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            self.modelObj.move(dx.v, dy.v);
        });

        $loc.clone = new Sk.builtin.func(function (self) {
            let p1 = Sk.misceval.callsim(self.getP1, self);
            let p2 = Sk.misceval.callsim(self.getP2, self);
            let pyObj = Sk.misceval.callsim(mod.Line, p1, p2);
            return pyObj;
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    circleClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, radius) {
            self.modelObj = new Circle(pointObj.modelObj, radius.v);
            self.pointObj = pointObj;
            self.radius = radius;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);

        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        $loc.getP1 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP1();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            return pyObj;
        });

        $loc.getP2 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP2();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            return pyObj;
        });

        $loc.getRadius = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getRadius();
            //clone to avoid reference issues....
            let radius = Sk.builtin.float_(model.getRadius());
            let pyObj = Sk.misceval.callsim(mod.Radius, radius);
            return pyObj;
        });

        $loc.getCenter = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getCenter();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("This is pyObj", pyObj);
            return pyObj;
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setWidth = new Sk.builtin.func(function(self, width) {
            self.modelObj.setWidth(width.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            self.modelObj.move(dx.v, dy.v);
        });

        $loc.clone = new Sk.builtin.func(function(self) {
            let p1 = Sk.misceval.callsim(self.getP1, self);
            let radius = Sk.misceval.callsim(self.getRadius, self);
            let pyObj = Sk.misceval.callsim(mod.Circle, p1, radius.radius);

            return pyObj;
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    rectangleClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, TopLeftCorner, BottomRightCorner ) {
            self.modelObj = new Rectangle(TopLeftCorner.modelObj, BottomRightCorner.modelObj);
            self.TopLeftCorner = TopLeftCorner;
            self.BottomRightCorner = BottomRightCorner;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        $loc.getP1 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP1();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("this is pyOBJ P1", pyObj);
            return pyObj;
        });

        $loc.getP2 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP2();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("this is pyOBJ P2", pyObj);
            return pyObj;
        });

        $loc.getCenter = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getCenter();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            return pyObj;
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setWidth = new Sk.builtin.func(function(self, width) {
            return self.modelObj.setWidth(width.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            //debugger;
            self.modelObj.move(dx.v, dy.v);
        });

        $loc.clone = new Sk.builtin.func(function (self) {
            let p1 = Sk.misceval.callsim(self.getP1, self);
            let p2 = Sk.misceval.callsim(self.getP2, self);
            let pyObj = Sk.misceval.callsim(mod.Rectangle, p1, p2);
            return pyObj;
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    ovalClass = function($glb, $loc){

        $loc.__init__ = new Sk.builtin.func(function(self, pointObj1, pointObj2){
            self.modelObj = new Oval(pointObj1.modelObj, pointObj2.modelObj);
            self.pointObj1 = pointObj1;
            self.pointObj2 = pointObj2;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        $loc.getP1 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP1();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("this is pyOBJ", pyObj);
            return pyObj;
        });

        $loc.getP2 = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getP2();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("this is pyOBJ", pyObj);
            return pyObj;
        });

        $loc.getCenter = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getCenter();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            console.log("This is pyObj", pyObj);
            return pyObj;
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setWidth = new Sk.builtin.func(function(self, width) {
            self.modelObj.setWidth(width.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            self.modelObj.move(dx.v, dy.v);
        });

        $loc.clone = new Sk.builtin.func(function (self) {
            let p1 = Sk.misceval.callsim(self.getP1, self);
            let p2 = Sk.misceval.callsim(self.getP2, self);
            let pyObj = Sk.misceval.callsim(mod.Oval, p1, p2);
            return pyObj;
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    polygonClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.points = [];
            let modelObjs = [""];

            console.log(arguments[1]);
            if (typeof(arguments[1].v) !== "undefined") {
                let args = arguments[1].v;
                for(let i=0; i < args.length; i++) {
                    self.points.push(args[i]);
                    modelObjs.push(args[i].modelObj);
                }
            }

            else {
                let args = Array.prototype.slice.call(arguments);
                for(let i=1; i < args.length; i++) {
                    self.points.push(args[i]);
                    modelObjs.push(args[i].modelObj);
                }
            }

            self.modelObj = new (Function.prototype.bind.apply(Polygon, modelObjs));
            return self;

        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        //need to do
        $loc.getPoints = new Sk.builtin.func(function(self) {
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setWidth = new Sk.builtin.func(function(self, width) {
            self.modelObj.setWidth(width.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            self.modelObj.move(dx.v, dy.v);
        });

        //DOES NOT WORK
        $loc.clone = new Sk.builtin.func(function (self) {
            let gPoints = Sk.misceval.callsim(self.getPoints, self);
            let pyObj = Sk.misceval.callsim(mod.Polygon, gPoints);
            return pyObj;
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    textClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, text ) {
            self.modelObj = new Text(pointObj.modelObj, text.v);
            self.pointObj = pointObj;
            self.text = text;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        $loc.setText = new Sk.builtin.func(function(self, text) {
            self.modelObj.setText(text.v);
        });

        $loc.getText = new Sk.builtin.func(function(self)
        {
            let getText = self.modelObj.getText();
            let getTextStr = Sk.builtins.str(getText);
            return getTextStr;
        });

        $loc.getAnchor = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getAnchor();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            return pyObj;
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setWidth = new Sk.builtin.func(function(self, width) {
            self.modelObj.setWidth(width.v);
        });

        $loc.setTextColor = new Sk.builtin.func(function(self, fillTextColor) {
            self.modelObj.setTextColor(fillTextColor.v);
        });

        $loc.setFace = new Sk.builtin.func(function(self, fontFace) {
            self.modelObj.setFace(fontFace.v);
        });

        $loc.setStyle = new Sk.builtin.func(function(self, fontStyle) {
            self.modelObj.setStyle(fontStyle.v);
        });

        $loc.setSize = new Sk.builtin.func(function(self, fontSize) {
            self.modelObj.setSize(fontSize.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            self.modelObj.move(dx.v, dy.v);
        });

        $loc.clone = new Sk.builtin.func(function (self) {

            let p1 = Sk.misceval.callsim(self.getAnchor, self);
            let text = Sk.misceval.callsim(self.getText, self);
            console.log("text is ", text);
            let pyObj = Sk.misceval.callsim(mod.Text, p1, text);

            return pyObj;
        });
    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    entryClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, radius) {

            self.modelObj = new Entry(pointObj.modelObj, radius.v);
            self.pointObj = pointObj;
            self.radius = radius;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        $loc.setText = new Sk.builtin.func(function(self, text) {
            self.modelObj.setText(text.v);
        });

        $loc.getText = new Sk.builtin.func(function(self)
        {
            let getText = self.modelObj.getText();
            let getTextStr = Sk.builtins.str(getText);
            return getTextStr;
        });

        $loc.getAnchor = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getAnchor();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            return pyObj;
        });

        $loc.getRadius = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getRadius();
            //clone to avoid reference issues....
            let radius = Sk.builtin.float_(model.getRadius());
            let pyObj = Sk.misceval.callsim(mod.Radius, radius);
            return pyObj;
        });

        $loc.setFill = new Sk.builtin.func(function(self, fill) {
            self.modelObj.setFill(fill.v);
        });

        $loc.setOutline = new Sk.builtin.func(function(self, stroke) {
            self.modelObj.setOutline(stroke.v);
        });

        $loc.setTextColor = new Sk.builtin.func(function(self, fillTextColor) {
            self.modelObj.setTextColor(fillTextColor.v);
        });

        $loc.setFace = new Sk.builtin.func(function(self, fontFace) {
            self.modelObj.setFace(fontFace.v);
        });

        $loc.setStyle = new Sk.builtin.func(function(self, fontStyle) {
            self.modelObj.setStyle(fontStyle.v);
        });

        $loc.setSize = new Sk.builtin.func(function(self, fontSize) {
            self.modelObj.setSize(fontSize.v);
        });

        $loc.move = new Sk.builtin.func(function (self, dx, dy) {
            self.modelObj.move(dx.v, dy.v);
        });

        $loc.clone = new Sk.builtin.func(function (self) {
            let p1 = Sk.misceval.callsim(self.getAnchor, self);
            let radius = Sk.misceval.callsim(self.getRadius, self);
            let pyObj = Sk.misceval.callsim(mod.Entry, p1, radius.radius);

            return pyObj;
        });

    };



    /**
     *
     * @param $glb
     * @param $loc
     */
    imageClass = function($glb, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, imageSrc) {
            self.modelObj = new Image(pointObj.modelObj, imageSrc.v);
            self.pointObj = pointObj;
            self.imageSrc = imageSrc;

            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

        //need to do
        $loc.getWidth = new Sk.builtin.func(function(self) {
            // return self.modelObj.getWidth();
        });

        //need to do
        $loc.getHeight = new Sk.builtin.func(function(self) {
        });

        $loc.getAnchor = new Sk.builtin.func(function(self) {
            let model = self.modelObj.getAnchor();

            //clone to avoid reference issues....
            let x = Sk.builtin.float_(model.getX());
            let y = Sk.builtin.float_(model.getY());
            let pyObj = Sk.misceval.callsim(mod.Point, x,y);
            return pyObj;
        });

        //need to do
        $loc.getImage = new Sk.builtin.func(function(self) {

        });

        $loc.move = new Sk.builtin.func(function (self, x, y) {
            self.modelObj.move(x.v, y.v);
        });

        // need to do
        $loc.clone = new Sk.builtin.func(function (self) {
            let getIma = Sk.misceval.callsim(self.getImage, self);
            let p1 = Sk.misceval.callsim(self.getAnchor, self);

            let pyObj = Sk.misceval.callsim(mod.Image, p1, getIma);

            return pyObj;
        });
    };




    mod.GraphWin = Sk.misceval.buildClass(mod, graphicsClass, "PGraphics", []);
    mod.Radius = Sk.misceval.buildClass(mod, radiusClass, "PRadiusClass", []);
    mod.Point  = Sk.misceval.buildClass(mod, pointClass, "PPointClass", []);
    mod.Circle = Sk.misceval.buildClass(mod, circleClass, "PCircleClass", []);
    mod.Rectangle = Sk.misceval.buildClass(mod, rectangleClass, "PRectangleClass", []);
    mod.Line = Sk.misceval.buildClass(mod, lineClass, "PLineClass", []);
    mod.Polygon = Sk.misceval.buildClass(mod, polygonClass, "PPolygonClass", []);
    mod.Oval = Sk.misceval.buildClass(mod, ovalClass, "POvalClass", []);
    mod.Text = Sk.misceval.buildClass(mod, textClass, "PTextClass", []);
    mod.Image = Sk.misceval.buildClass(mod, imageClass, "PImageClass", []);
    mod.Entry = Sk.misceval.buildClass(mod, entryClass, "PEntryClass", []);


    return mod;

//End of Main Function
};
