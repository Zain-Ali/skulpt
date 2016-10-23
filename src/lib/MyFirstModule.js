// All module must and always start with var $builtinmodule = statement
// The SK.buildin.func call for adding functions to your module,
// and the SK. miscebal.build class method,
var $builtinmodule = function (name) {
    var mod = {};
    var generatingNumber = {};

    //get square root of number
    mod.sqrt = new Sk.builtin.func(function (x) {
        Sk.builtin.pyCheckArgs("sqrt", arguments, 1, 1);
        Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x)); // validate / check if input is a number
        return new Sk.builtin.float_(Math.sqrt(Sk.builtin.asnum$(x))); // validate / check if input is a number
    });

    // gets multiple by itself with number of y i.e. 2, 3 = 2*2*2
    mod.pow = new Sk.builtin.func(function (x, y) {
        Sk.builtin.pyCheckArgs("pow", arguments, 2, 2);
        Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x));
        Sk.builtin.pyCheckType("y", "number", Sk.builtin.checkNumber(y));
        return new Sk.builtin.float_(Math.pow(Sk.builtin.asnum$(x), Sk.builtin.asnum$(y))); // asnum function introduced to wrapp and unwrapp object
    });

    // it add x and y
    mod.add = new Sk.builtin.func(function (x, y) {
        Sk.builtin.pyCheckArgs("add", arguments, 2, 2);
        Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x));
        Sk.builtin.pyCheckType("y", "number", Sk.builtin.checkNumber(y));
        return new Sk.builtin.float_(Sk.builtin.asnum$(x) + Sk.builtin.asnum$(y));
    });

    // it minus x and y
    mod.minus = new Sk.builtin.func(function (x, y) {
        Sk.builtin.pyCheckArgs("minus", arguments, 2, 2);
        Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x));
        Sk.builtin.pyCheckType("y", "number", Sk.builtin.checkNumber(y));
        return new Sk.builtin.float_(Sk.builtin.asnum$(x) - Sk.builtin.asnum$(y));
    });


    // it multiply x and y
    mod.multiply = new Sk.builtin.func(function (x, y) {
        Sk.builtin.pyCheckArgs("multiply", arguments, 2, 2);
        Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x));
        Sk.builtin.pyCheckType("y", "number", Sk.builtin.checkNumber(y));
        return new Sk.builtin.float_(Sk.builtin.asnum$(x) * Sk.builtin.asnum$(y));
    });

    // it divide x and y
    mod.divide = new Sk.builtin.func(function (x, y) {
        Sk.builtin.pyCheckArgs("divide", arguments, 2, 2);
        Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x));
        Sk.builtin.pyCheckType("y", "number", Sk.builtin.checkNumber(y));
        return new Sk.builtin.float_(Sk.builtin.asnum$(x) / Sk.builtin.asnum$(y));
    });

    mod.random = new Sk.builtin.func(function () {
        Sk.builtin.pyCheckArgs("random", arguments, 2, 9);
        return new Sk.builtin.float_(Math.random() + 2);
    });

    mod.randNumber = new Sk.builtin.func(function (x, y) {
        Sk.builtin.pyCheckArgs("randNumber", 2, 2);
        x = Sk.builtin.asnum$(x);
        y = Sk.builtin.asnum$(y);
        return randrange(x, (y + 1), 1);
    });

    //non- functional function (require attention)
    mod.randrange = new Sk.builtin.func(function (start, stop, step) {
        Sk.builtin.pyCheckArgs("randrange", arguments, 1, 3);

        start = Sk.builtin.asnum$(start);
        stop = Sk.builtin.asnum$(stop);
        step = Sk.builtin.asnum$(step);
        return randrange(start, stop, step);
    });


    mod.factorial = new Sk.builtin.func(function (x) {
        Sk.builtin.pyCheckArgs("factorial", arguments, 1, 1);
        Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x));

        x = Math.floor(Sk.builtin.asnum$(x));
        var r = 1;
        for (var i = 2; i <= x; i++) {
            r *= i;
        }
        return new Sk.builtin.int_(r);
    });

    return mod;
}