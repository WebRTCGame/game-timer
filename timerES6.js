class Timer {
    constructor() {
        this.initialTicks = 'number' === typeof a ? a || 0 : this.HMStoS(a);
        this.pausedTime = this.lastTimestamp = 0;
        var b = this.initialTicks || 0;
        Object.defineProperty(this, 'ticks', {
            get: function() {
                return b;
            },
            set: function(a) {
                a !== b && (b = a, this.onTick(), this.when(b));
            },
            enumerable: !0,
            configurable: !0
        });
        this.maxStep = 1;
        this.increment = !0;
        this.scale = 1;
        this.paused = !1;
        this.when = function() {};
        this.onTick = function() {};
        return this;
    }
    HMStoS(a) {
        var b = 0;
        a.hasOwnProperty('h') && (b = 3600 * a.h);
        a.hasOwnProperty('m') && (b += 60 * a.m);
        a.hasOwnProperty('s') && (b += a.s);
        return b;
    }
    step() {
        var a = Date.now();
        if (!this.paused) {
            var b = (a - this.lastTimestamp) / 1000;
            this.ticks = this.increment ? this.ticks + Math.min(b, this.maxStep) * this.scale : this.ticks - Math.min(b, this.maxStep) * this.scale;
        }
        this.lastTimestamp = a;
        return this;
    }
    getHMS() {
        var a = this.ticks,
            a = Math.round(a),
            b = Math.floor(a / 3600),
            c = a % 3600,
            a = Math.floor(c / 60),
            c = Math.ceil(c % 60);
        return {
            h: b,
            m: a,
            s: c
        };
    }
    getHMSObj() {
        return JSON.stringify(this.getHMS());
    }
    pause() {
        this.paused ? this.paused = !1 : (this.pausedTime = this.ticks, this.paused = !0);
        return this;
    }
    reset() {
        this.ticks = this.initialTicks;
        return this;
    }
    start() {
        this.paused = !1;
        return this;
    }
    stop() {
        this.pause();
        this.reset();
        return this;
    }
}