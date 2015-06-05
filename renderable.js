var Renderable = function(b) {
    function a(c) {
        Object.apply(this, arguments);
        Object.defineProperties(this, {
            "super": {
                value: Object.getPrototypeOf(this),
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "doRender": {
                value: true,
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "_x": {
                value: 0,
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "_y": {
                value: 0,
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "_width": {
                value: 0,
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "_height": {
                value: 0,
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "_rotation": {
                value: 0,
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "_scaleX": {
                value: 1,
                writable: !0,
                enumerable: !0,
                configurable: !0
            },
            "_scaleY": {
                value: 1,
                writable: !0,
                enumerable: !0,
                configurable: !0
            }
        });
        return this;
    }
    a.prototype = Object.create(Object, {});

    a.prototype.constructor = a;

    Object.defineProperties(a.prototype, {
        "x": {
            get: function() {
                return this._x;
            },
            set: function(a) {
                this._x = a;
            },
            enumerable: !0,
            configurable: !0
        },
        "y": {
            get: function() {
                return this._y;
            },
            set: function(a) {
                this._y = a;
            },
            enumerable: !0,
            configurable: !0
        },
        "width": {
            get: function() {
                return this._width;
            },
            set: function(a) {
                this._width = a;
            },
            enumerable: !0,
            configurable: !0
        },
        "height": {
            get: function() {
                return this._height;
            },
            set: function(a) {
                this._height = a;
            },
            enumerable: !0,
            configurable: !0
        },
        "rotation": {
            get: function() {
                return this._rotation;
            },
            set: function(a) {
                this._rotation = a;
            },
            enumerable: !0,
            configurable: !0
        },
        "scaleX": {
            get: function() {
                return this._scaleX;
            },
            set: function(a) {
                this._scaleX = a;
            },
            enumerable: !0,
            configurable: !0
        },
        "scaleY": {
            get: function() {
                return this._scaleY;
            },
            set: function(a) {
                this._scaleY = a;
            },
            enumerable: !0,
            configurable: !0
        },
        "preRender": {
            value: function(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.scale(this.scaleX, this.scaleY);
            },
            writable: !1,
            enumerable: !1,
            configurable: !1
        },
        "postRender": {
            value: function(ctx) {
                ctx.restore();
            },
            writable: !1,
            enumerable: !1,
            configurable: !1
        },
        /*-- must override --*/
        "draw": {
            value: function(ctx) {},
            writable: !0,
            enumerable: !0,
            configurable: !0
        },
        "render": {
            value: function(ctx) {
                if (this.doRender){
                this.preRender(ctx);
                this.draw(ctx);
                this.postRender(ctx);
                };
            },
            writable: !1,
            enumerable: !0,
            configurable: !0
        },
        /*-- must override --*/
        "update": {
            value: function() {},
            writable: !0,
            enumerable: !0,
            configurable: !0
        },
        "mixin": {
            value: function(source) {
                for (var prop in source) {
                    if (source.hasOwnProperty(prop)) {
                        this[prop] = source[prop];
                    }
                }
            },
            writable: !1,
            enumerable: !0,
            configurable: !0
        }
    });

    return a;
}();