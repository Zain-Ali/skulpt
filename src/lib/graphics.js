/**
 * Created by ZainAli on 08/11/2016.
 */

var $builtinmodule = function (name) {
    "use strict";

    function configureCanvas() {
    }

    function generateGraphicsModule() {

        var module = {};
        var title = "Graphics Window"
        var self;
        var shapes;
        var Shapes = {};
        var Types; //variable types
        var _config;
        var _screenInstance;
        var _mouseHandler;
        var master;
        var None = null;

        // Ensure that the graphics DOM target has a tabindex
        // so that it can accept keyboard focus and events
        if (!_target.hasAttribute("tabindex")) {
            _target.setAttribute("tabindex", 0);
        }

        /*        Types.FLOAT = function(value) {
            return Sk.builtin.float_(value);
        };

        Types.COLOR = function(value) {
            if (typeof value === "string") {
                return new Sk.builtin.str(value);
            }
            else {
                for(var i = 0; i < 3; i++) {
                    value[i] = Sk.builtin.assk$(value[i]);
                }
                if (value.length === 4) {
                    value[3] = Sk.builtin.float_(value[3]);
                }
                return new Sk.builtin.tuple(value);
            }
        };

        Types.TURTLE_LIST = function(value) {
            var skValues = [];
            for (var i = 0; i < value.length; i++) {
                skValues.push(value[i].skInstance);
            }
            return new Sk.builtin.tuple(skValues);
        };*/


        // some stuff to go here

        _config = (function() {
            var defaultSetup = {
                    target     : "graphics", // DOM element or id of parent container
                    title      : "Graphics Window",
                    width      : 200, // if set to 0 it will use the target width
                    height     : 200, // if set to 0 it will use the target height
                    bufferSize : 0, // default MyGraphics buffer size
                    autoFlush  :true,
                    allowUndo  : true, // enable ability to use the undo buffer
                },
                key;

            if (!Sk.graphics) {
                Sk.graphics = {};
            }

            if(!Sk.graphics) {
                Sk.graphics = {};
            }

            //if it does not have its own property then set up using defaultSetup settings from above
            for(key in defaultSetup) {
                if (!Sk.graphics.hasOwnProperty(key)) {
                    Sk.graphics[key] = defaultSetup[key];
                }
            }
            return Sk.graphics;
        })();

        assert.type(title) == type(""), "Title must be string";
        self.foreground = "black";
        self.items = [];
        self.mouseX = None;
        self.mouseY = None;
        self.height = (height);
        self.width = (width);
        sef.autoFlush = autoFlush;

    }
};


