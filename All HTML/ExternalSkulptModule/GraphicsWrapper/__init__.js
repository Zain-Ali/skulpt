/**
 * Created by zain on 11/11/2016.
 */

// This is a wrapper class
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

    var  colorClass = {};
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
    mod.PTriangleClass = {};
    mod.POvalClass = {};

    mod.PTextClass = {};


    graphicsClass = function($glb, $loc){
        debugger;
        $loc.__init__ = new Sk.builtin.func(function(self, title, width, height){
            self.title = title;
            self.height = height;
            self.width = width;
            self.modelObj = new GraphWinJs(title.v, height.v, width.v); //
            return self;
        });
        // have to store the class I am wrapping in modelObj.
        // the reason for that is because of using getter and setter to make it generic

        //this function is excuted everytime you want to get attribute from Python
        //it executed from Python towards JSe.g. if (obj.Value == True)
        //return python values
        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        //Functionality needed to be added for this to close the Window (Canvas / SVG)
        $loc.close = new Sk.builtin.func(function(self){
            console.log(self.testProperty.v);
        });
    };

    pointClass = function($glb, $loc){
        //debugger;
        $loc.__init__ = new Sk.builtin.func(function(self, x, y){
            self.modelObj = new Point(x.v, y.v);
            self.x = x;
            self.y = y;
            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;
    };
    // because python types are different types to JS.
    //look at the point

    circleClass = function($glb, $loc){
        //debugger;
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

        $loc.draw = new Sk.builtin.func(function (self, fillStyle) {
            self.modelObj.draw(fillStyle.modelObj);

        });

        $loc.undraw = new Sk.builtin.func(function(self, graphWinObj) {
            self.modelObj.undraw(graphWinObj.modelObj);
        });

    };

    rectangleClass = function($glb, $loc){
        //debugger;
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
        //debugger;
        $loc.__init__ = new Sk.builtin.func(function(self, x, y ){
            self.modelObj = new Rectangle(x.modelObj, y.modelObj);
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




    ovalClass = function($glb, $loc){
        debugger;
        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, radius ){
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





    textClass = function($glb, $loc){
        //debugger;
        $loc.__init__ = new Sk.builtin.func(function(self, text, pointObj ){
            self.modelObj = new Text(text.v, pointObj.modelObj);
            debugger;
            self.text = text; //self.text = JSON.stringify(text)
            self.pointObj = pointObj;
            return self;
        });

        $loc.__getattr__ = reuseingGetterSetter.__getattr__;
        $loc.__setattr__ = reuseingGetterSetter.__setattr__;

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            self.modelObj.draw(graphWinObj.modelObj);
        });
    };

    mod.GraphWin = Sk.misceval.buildClass(mod, graphicsClass, "PGraphics", []);
    mod.Point  = Sk.misceval.buildClass(mod, pointClass, "PPointClass", []);
    mod.Circle = Sk.misceval.buildClass(mod, circleClass, "PCircleClass", []);
    mod.Rectangle = Sk.misceval.buildClass(mod, rectangleClass, "PRectangleClass", []);
    mod.Line = Sk.misceval.buildClass(mod, lineClass, "PLineClass", []);
    //mod.Triangle = Sk.misceval.buildClass(mod, triangleClass, "PTriangleClass", []);
    mod.Oval = Sk.misceval.buildClass(mod, ovalClass, "POvalClass", []);

   // mod.Text = Sk.misceval.buildClass(mod, textClass, "PTextClass", []);



    return mod;
};
