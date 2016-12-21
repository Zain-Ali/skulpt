/**
 * Created by zain on 11/11/2016.
 */

// This is a JavaScript and SVG wrapper class. Wrapping JS and SVG in Python

var $builtinmodule = function(name){
    "use strict";
    var graphicsClass = {};
    var pointClass = {};
    var circleClass = {};
    var rectangleClass = {};
    var lineClass = {};
    var triangleClass = {};
    var ovalClass = {};
    var textClass = {};
    var polygonClass = {};
    var mod = {};



    var reuseingGetterSetter = {
        __getattr__ : new Sk.builtin.func(function (self, key) {
            if(self[key.v] != undefined) { //everything is stored on self object
                self[key.v].v = self.modelObj[key.v]; //
                return self[key.v];
            }
            //else throw exception
        }),

        __setattr__: new Sk.builtin.func(function (self, key, value) {
            if(self[key.v] != undefined) {
                self.modelObj[key.v] = value;
                return self[key.v] = value;
            }
            //else throw exception
        })
    };



    //P stand for Python
    mod.PGraphics = {};
    mod.PPointClass = {};
    mod.PCircleClass = {};
    mod.PRectangleClass = {};
    mod.PLineClass = {};
    mod.PPolygonClass = {};

    mod.PTriangleClass = {};
    mod.POvalClass = {};
    mod.PTextClass = {};



    graphicsClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, title, width, height){
            self.title = title;
            self.height = height;
            self.width = width;
            self.modelObj = new GraphWinJs(title.v, height.v, width.v); //
            return self;
        });


        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;


        $loc.close = new Sk.builtin.func(function(self){
            //Functionality needed to be added for this to close the Window (Canvas / SVG)
            //console.log(self.testProperty.v);
        });
    };



    pointClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, x, y){
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
    };



    circleClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, radius){
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

        //////////////////
        // $loc.setFill = new Sk.builtin.func(function (self, graphWinObj, setFill) {
        //     self.modelObj.setFill(graphWinObj.modelObj, setFill.v);
        //
        // });
        /////////////////


        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

    };



    rectangleClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, TopLeftCorner, BottomRightCorner ){
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
    };



    lineClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, point1, point2){
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
    };



    ovalClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, radius){
            self.modelObj = new Oval(pointObj.modelObj, radius.v);
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
    };



    polygonClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, point1, point2, point3){
            self.modelObj = new Polygon(point1.modelObj, point2.modelObj, point3.modelObj);
            self.point1 = point1;
            self.point2 = point2;
            self.point3 = point3;


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
    };






    // textClass = function($glb, $loc){
    //     $loc.__init__ = new Sk.builtin.func(function(self, x, y ){
    //         self.modelObj = new Text(x.modelObj, y.modelObj);
    //         self.x = x;
    //         self.y = y;
    //
    //         return self;
    //     });
    //
    //
    //     $loc.__getattr__ = reuseingGetterSetter.__getattr__;
    //     $loc.__setattr__ = reuseingGetterSetter.__setattr__;
    //
    //
    //     $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
    //         self.modelObj.draw(graphWinObj.modelObj);
    //     });
    //
    //
    //     $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
    //         self.modelObj.undraw(graphWinObj.modelObj);
    //     });
    // };

    // /*
    // * Non Working Code
    // */
    // triangleClass = function($glb, $loc){
    //     //debugger;
    //     $loc.__init__ = new Sk.builtin.func(function(self, width, height ){
    //         self.modelObj = new Triangle(width.modelObj, height.modelObj);
    //         self.width = width;
    //         self.height = height;
    //         return self;
    //     });
    //
    //     $loc.__getattr__ = reuseingGetterSetter.__getattr__;
    //     $loc.__setattr__ = reuseingGetterSetter.__setattr__;
    //
    //     $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
    //         self.modelObj.draw(graphWinObj.modelObj);
    //     });
    // };

    mod.GraphWin = Sk.misceval.buildClass(mod, graphicsClass, "PGraphics", []);
    mod.Point  = Sk.misceval.buildClass(mod, pointClass, "PPointClass", []);
    mod.Circle = Sk.misceval.buildClass(mod, circleClass, "PCircleClass", []);
    mod.Rectangle = Sk.misceval.buildClass(mod, rectangleClass, "PRectangleClass", []);
    mod.Line = Sk.misceval.buildClass(mod, lineClass, "PLineClass", []);
    mod.Polygon = Sk.misceval.buildClass(mod, polygonClass, "PPolygonClass", []);


    mod.Oval = Sk.misceval.buildClass(mod, ovalClass, "POvalClass", []);

    //mod.Triangle = Sk.misceval.buildClass(mod, triangleClass, "PTriangleClass", []);

    //mod.Text = Sk.misceval.buildClass(mod, textClass, "PTextClass", []);


    return mod;
//End of Main Function
};
