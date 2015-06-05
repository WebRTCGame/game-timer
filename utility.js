/*jshint camelcase: true, browser:true, maxlen: 100, curly: true, eqeqeq: true, immed: true, latedef: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, maxdepth: 3, maxstatements:20, maxcomplexity: 5 */
/* global $:true, Vector:true, Fish:true, Food:true, utils:true */


if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 17 /*~ 1000/60*/ );
        });
}


if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
        window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
        window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
        window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
        window.clearTimeout);
}


window.utils = {};

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
window.utils.captureMouse = function(element) {
    var mouse = {
            x: 0,
            y: 0,
            event: null
        },
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('mousemove', function(event) {
        var x, y;

        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        }
        else {
            x = event.clientX + body_scrollLeft + element_scrollLeft;
            y = event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        mouse.x = x;
        mouse.y = y;
        mouse.event = event;
    }, false);

    return mouse;
};

/**
 * Keeps track of the current (first) touch position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, isPressed, event
 */
window.utils.captureTouch = function(element) {
    var touch = {
            x: null,
            y: null,
            isPressed: false,
            event: null
        },
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('touchstart', function(event) {
        touch.isPressed = true;
        touch.event = event;
    }, false);

    element.addEventListener('touchend', function(event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    element.addEventListener('touchmove', function(event) {
        var x, y,
            touch_event = event.touches[0]; //first touch

        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        }
        else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);

    return touch;
};

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
window.utils.parseColor = function(color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0); //chop off decimal
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return window.parseInt(color, 16);
    }
    else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
        }
        return color;
    }
};

/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
window.utils.colorToRGB = function(color, alpha) {
    //number in octal format or string prefixed with #
    if (typeof color === 'string' && color[0] === '#') {
        color = window.parseInt(color.slice(1), 16);
    }
    alpha = (alpha === undefined) ? 1 : alpha;
    //parse hex values
    var r = color >> 16 & 0xff,
        g = color >> 8 & 0xff,
        b = color & 0xff,
        a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
    //only use 'rgba' if needed
    if (a === 1) {
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    else {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {number}  x     Coordinate position x.
 * @param {number}  y     Coordinate position y.
 * @return {boolean}
 */
window.utils.containsPoint = function(rect, x, y) {
    return !(x < rect.x ||
        x > rect.x + rect.width ||
        y < rect.y ||
        y > rect.y + rect.height);
};
/**
 * A fast check if a point is within a rectangle
 * @param {Number} x x-position of the point to test
 * @param {Number} y y-position of the point to test
 * @param {Number} rx x-position of the rectangle
 * @param {Number} ry y-position of the rectangle
 * @param {Number} rw width of the rectangle
 * @param {Number} rh height of the rectangle
 * @return {Boolean} true is the point is within the rectangle
 */
window.utils.isPointInRect = function(x, y, rx, ry, rw, rh) {
    return x >= rx && x <= (rx + rw) &&
        y >= ry && y <= (ry + rh);
};

//Point To Line Intersection
window.utils.dotLineIntersection = function(x, y, x0, y0, x1, y1) {
    if (!(x1 - x0))
        return {
            x: x0,
            y: y
        };
    else if (!(y1 - y0))
        return {
            x: x,
            y: y0
        };
    var left, tg = -1 / ((y1 - y0) / (x1 - x0));
    return {
        x: left = (x1 * (x * tg - y + y0) + x0 * (x * -tg + y - y1)) / (tg * (x1 - x0) + y0 - y1),
        y: tg * left - tg * x + y
    };
};

/**
 * closestSquarePoint(px: Integer, py: Integer, x: Integer, y: Integer, width: Integer, height: Integer): Object
Returns a object containing two properties (x and y), that specifies the limit point of a square in relation to a point.
* @param px x coord of the point
* @param py y coord of the point
* @param x x coord of the square origin point
* @param y y coord of the square origin point
* @param width width of the square
* @param height height of the square
* @return {object} 
*/
window.utils.closestSquarePoint = function(px, py, x, y, w, h) {
    return {
        x: px < x ? x : px > x + w ? x + w : px,
        y: py < y ? y : py > y + h ? y + h : py
    };
};
/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
window.utils.intersects = function(rectA, rectB) {
    return !(rectA.x + rectA.width < rectB.x ||
        rectB.x + rectB.width < rectA.x ||
        rectA.y + rectA.height < rectB.y ||
        rectB.y + rectB.height < rectA.y);
};

window.utils.interpolateColor = function(colorA, colorB) {
    var interpolation = -1,
        difference = Math.abs(colorA - colorB);

    if (difference > 0.5) {
        interpolation = (colorA > colorB ? colorA : colorB) + (1 - difference) / 2;

        if (interpolation > 1) {
            interpolation -= 1;
        }

    }
    else {
        interpolation = (colorA + colorB) / 2;
    }

    return interpolation;
};

window.utils.rgb2hex = function(rgb) {
    rgb.r |= 0;
    rgb.g |= 0;
    rgb.b |= 0;

    var r = rgb.r.toString(16);
    var g = rgb.g.toString(16);
    var b = rgb.b.toString(16);

    r = r.length === 1 ? "0" + r : r;
    g = g.length === 1 ? "0" + g : g;
    b = b.length === 1 ? "0" + b : b;

    return "#" + r.substr(0, 2) + g.substr(0, 2) + b.substr(0, 2);
};

window.utils.hsv2rgb = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
};

window.utils.hex2rgb = function(h) {
    var hex = h.toString().substr(1);
    var r = parseInt(hex[0] + hex[1], 16);
    var g = parseInt(hex[2] + hex[3], 16);
    var b = parseInt(hex[4] + hex[5], 16);

    return {
        r: r,
        g: g,
        b: b
    };
};


window.utils.hue2hex = function(hue) {
    var rgb = utils.hsv2rgb(hue, 1, 1);
    var hex = utils.rgb2hex(rgb);
    return hex;
};

if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisArg*/ ) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

var PI2 = Math.PI * 2;

window.utils.ptInTriangle = function(p, p0, p1, p2) {
    var A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
    var sign = A < 0 ? -1 : 1;
    var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
    var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

    return s > 0 && t > 0 && (s + t) < 2 * A * sign;
};

window.utils.isPointInPoly = function(poly, pt) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) && (c = !c);
    return c;
};

window.utils.toRadians = function(deg) {
    'use strict';
    return deg * Math.PI / 180;
};


// Converts from radians to degrees.
window.utils.toDegrees = function(radians) {
    return radians * 180 / Math.PI;
};

window.utils.midpoint = function(x1, y1, x2, y2) {
    return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
    };
};

window.utils.pointAngle = function(x1, y1, x2, y2) {
    //var tempX = x2 - x1;
    //var tempY = y2 - y1;

    return window.utils.wrap2P(Math.atan2(y2 - y1, x2 - x1));

    //return theta; //theta * 180 / Math.PI;
};



window.utils.distance = function(x1, y1, x2, y2) {
    return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
};

window.utils.near = function(x1, y1, x2, y2, length) {
    return window.utils.distance(x1, y1, x2, y2) <= length;
};

window.utils.getPointAL = function(x, y, angle, length) {
    var radA = window.utils.toRadians(angle);
    return {
        x: x + length * Math.cos(radA),
        y: y + length * Math.sin(radA)
    };
};

window.utils.wrap2P = function(b) {

    return b % PI2;
};
window.utils.wrapAngleDeg = function(b) {

    return b % 360;
};

window.utils.simplifyAngle = function(angle) {
    // if the angle is negative we add 360
    if (angle < 0)
        return angle + 360;
    if (angle > 360)
        return angle % 360;

    return angle;
};

/**
 * Gives you the angle of a given vector x, y
 * @param {Number} x x component of the 2d vector
 * @param {Number} y y component of the 2d vector
 * @return Angle in degrees
 */
window.utils.angleFromVector = function(x, y) {
    // angle to vector
    var a = pc.Math.radToDeg(Math.atan2(y, x));
    //if (a < 0) a += 360;
    a = window.utils.simplifyAngle(a);
    return a;
}
window.utils.randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

window.utils.randomBetween = function(min, max) {
    return Math.random() * (max - min + 1) + min;
};