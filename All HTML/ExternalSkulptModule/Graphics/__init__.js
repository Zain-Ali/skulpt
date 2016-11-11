/**
 * Created by zain on 11/11/2016.
 */
var $builtinmodule = function(name){
    "use strict";
    var graphicsClass = {};
    var pointClass = {};
    var circleClass = {};
    var mod = {};

    mod.PGraphics = {};
    mod.PPointClass = {};
    mod.PCircleClass = {};


    graphicsClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, parentId, width, height){
            self.parentId = parentId;
            self.height = height;
            self.width = width;
            self.modelObj = new GraphWinJs(parentId.v, height.v, width.v);
            return self;
        });

        $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
            if(self[key.v] != undefined) {
                self[key.v].v = self.modelObj[key.v];
                return self[key.v];
            }
            //else throw exception
        });

        $loc.__setattr__ = new Sk.builtin.func(function (self, key, value) {
            if(self[key.v] != undefined) {
                self.modelObj[key.v] = value;
                return self[key.v] = value;
            }
            //else throw exception
        });

        $loc.close = new Sk.builtin.func(function(self){
            console.log(self.testProperty.v);
        });
    };


    pointClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, x, y){
            self.modelObj = new Point(x.v, y.v);
            self.x = x;
            self.y = y;
            return self;
        });

        $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
            if(self[key.v] != undefined) {
                self[key.v].v = self.modelObj[key.v];
                return self[key.v];
            }
            //else throw exception
        });

        $loc.__setattr__ = new Sk.builtin.func(function (self, key, value) {
            if(self[key.v] != undefined) {
                self.modelObj[key.v] = value;
                return self[key.v] = value;
            }
            //else throw exception
        });
    };

    circleClass = function($glb, $loc){
        $loc.__init__ = new Sk.builtin.func(function(self, pointObj, radius ){
            self.modelObj = new Circle(pointObj.modelObj, radius.v)
            self.pointObj = pointObj;
            self.radius = radius;
            return self;
        });

        $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
            if(self[key.v] != undefined) {
                self[key.v].v = self.modelObj[key.v];
                return self[key.v];
            }
            //else throw exception
        });

        $loc.__setattr__ = new Sk.builtin.func(function (self, key, value) {
            if(self[key.v] != undefined) {
                self.modelObj[key.v] = value;
                return self[key.v] = value;
            }
            //else throw exception
        });

        $loc.draw = new Sk.builtin.func(function (self, graphWinObj) {
            debugger;
           self.modelObj.draw(graphWinObj.modelObj);

        });
    };



    mod.GraphicsWin = Sk.misceval.buildClass(mod, graphicsClass, "PGraphics", []);
    mod.Point  = Sk.misceval.buildClass(mod, pointClass, "PPointClass", []);
    mod.Circle = Sk.misceval.buildClass(mod, circleClass, "PCircleClass", []);

    return mod;
};

