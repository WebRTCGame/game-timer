# game-timer
HTML5 Framerate Independent Javascript Game Timer. 

It works with requestAnimationFrame but it's not dependant on it for timing.  So instead of incrementing something every frame i.e. x++; which won't be incremented consistently if you have varying framerates as they are dependant on many factors.  A persons hardware, other resources being utilized, the complexity of your update/render loop, etc. all factor into your eventual frames per second.  There's no way I've found to guarantee 60fps.  With this timer the fps don't matter as much and can vary.

The timer object itself is very simple still, with a very simple api.  As the complexity grows the chance for the timer itself to impact performance grows as well.  That is something I want to avoid.

The index.html is a simple render/update loop with requestAnimationFrame, including a little stub to generate the delta time and frames per second.

So far in the api:

```javascript
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
```
