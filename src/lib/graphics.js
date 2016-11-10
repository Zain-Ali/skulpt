/**
 * Created by ZainAli on 08/11/2016.
 */
var $builtinmodule = function (name) {

};


/*var $builtinmodule = function (name) {
    "use strict";

    function getConfiguredTarget() {
        var selector, target;

        selector = (Sk.graphics && Sk.graphics.target) || "graphics",
            target   = typeof selector === "string" ?
                document.getElementById(selector) :
                selector;
        // ensure that the canvas container is empty
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
        return target;
    }

/!*
    function generateGraphicsModule() {

        var _module = {};
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
        var color;


        mod.graphics = null;

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

        proto.$getscreen = function() {
            return _module.Screen();
        };

        function Screen() {
            var w,h;
            this._frames    = 1;
            this._delay     = undefined;
            this._bgcolor   = "none";
            this._mode      = "standard";
            this._managers  = {};
            this._keyLogger = {};
            if (_config.height && _config.width) {
                w = _config.width/2;
                h = _config.height/2;
            } else {
                _config.defaultSetup = undefined;
                w = _config.defaultSetup.width/2;
                h = _config.defaultSetup.height/2;
            }
            this.setUpWorld(-w,-h,w,h);
        }

        function getScreen() {
            if (!_screenInstance) {
                _screenInstance = new Screen();
            }
            return _screenInstance;
        }

        function ScreenWrapper($gbl, $loc) {
            $loc.__init__ = new Sk.builtin.func(function (self) {
                self.instance = getScreen();
            });

            for(var key in Screen.prototype) {
                if (/^\$[a-z_]+/.test(key)) {
                    addModuleMethod(Screen, $loc, key);
                }
            }
        }

        // add Screen method aliases to the main turtle module
        // to allow things like:
        //   import turtle
        //   turtle.mainloop()
        addModuleMethod(Screen, _module, "$mainloop", getScreen);
        addModuleMethod(Screen, _module, "$done", getScreen);
        addModuleMethod(Screen, _module, "$bye", getScreen);
        addModuleMethod(Screen, _module, "$tracer", getScreen);
        addModuleMethod(Screen, _module, "$update", getScreen);
        addModuleMethod(Screen, _module, "$delay", getScreen);
        addModuleMethod(Screen, _module, "$window_width", getScreen);
        addModuleMethod(Screen, _module, "$window_height", getScreen);

        _module.Turtle = Sk.misceval.buildClass(_module, TurtleWrapper, "Turtle", []);
        _module.Screen = Sk.misceval.buildClass(_module, ScreenWrapper, "Screen", []);


        return {
            skModule : _module,
            reset    : resetTurtle,
            stop     : stopTurtle,
            focus    : focusTurtle,
            Turtle   : Turtle,
            Screen   : Screen
        };

    }
*!/
};*/


