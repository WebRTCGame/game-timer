var Timer = function(initialTicks) {
    this.initialTicks = initialTicks || 0;
    this.lastTimestamp = 0;
    this.pausedTime = 0;
    this.ticks = this.initialTicks || 0;
    this.maxStep = 1;
    this.increment = true;
    this.scale = 1.0;
    this.paused = false;

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

}
Timer.prototype.pause = function() {
    if (!this.paused) {
        this.pausedTime = this.ticks;
        this.paused = true;
    }
    else {
        this.paused = false;
    }
};
Timer.prototype.reset = function() {
    this.ticks = this.initialTicks;
};
Timer.prototype.start = function() {
    this.paused = false;
};
Timer.prototype.stop = function() {
    this.pause();
    this.reset();

};