var Timer = function(initialTicks) {

    if (typeof initialTicks === "number") {
        this.initialTicks = initialTicks || 0;
    }
    else {
        this.initialTicks = this.HMStoS(initialTicks);
    }


    this.lastTimestamp = 0;
    this.pausedTime = 0;
    var _ticks = this.initialTicks || 0;

    Object.defineProperty(this, 'ticks', {
        get: function() {
            return _ticks;
        },
        set: function(newValue) {
            if (newValue !== _ticks) {
                _ticks = newValue;
                this.onTick();
                this.when(_ticks);
            }

        },
        enumerable: true,
        configurable: true
    });
    this.maxStep = 1;
    this.increment = true;
    this.scale = 1.0;
    this.paused = false;
    this.when = function() {};
    return this;
};

Timer.prototype.onTick = function() {};

Timer.prototype.HMStoS = function(value) {
    var retVal = 0;
    if (value.hasOwnProperty("h")) {
        retVal = value["h"] * 3600;
    }
    if (value.hasOwnProperty("m")) {
        retVal += value["m"] * 60;
    }
    if (value.hasOwnProperty("s")) {
        retVal += value["s"];
    }
    return retVal;
};
Timer.prototype.step = function() {
    var current = Date.now();
    if (!this.paused) {

        var delta = (current - this.lastTimestamp) / 1000;

        if (this.increment) {
            this.ticks += (Math.min(delta, this.maxStep) * this.scale);
        }
        else {
            this.ticks -= (Math.min(delta, this.maxStep) * this.scale);
        }

    }
    this.lastTimestamp = current;
    return this;
};
Timer.prototype.getHMS = function() {

    var a = this.ticks;
    a = Math.round(a);
    var c = Math.floor(a / 3600),
        b = a % 3600;
    a = Math.floor(b / 60);
    b = Math.ceil(b % 60);
    return {
        h: c,
        m: a,
        s: b
    };

};
Timer.prototype.getHMSObj = function() {
    return JSON.stringify(this.getHMS());
};
Timer.prototype.pause = function() {
    if (!this.paused) {
        this.pausedTime = this.ticks;
        this.paused = true;
    }
    else {
        this.paused = false;
    }
    return this;
};
Timer.prototype.reset = function() {
    this.ticks = this.initialTicks;
    return this;
};
Timer.prototype.start = function() {
    this.paused = false;
    return this;
};
Timer.prototype.stop = function() {
    this.pause();
    this.reset();
    return this;
};