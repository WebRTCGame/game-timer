# game-timer
HTML5 Framerate Independent Javascript Game Timer. 

It works with requestAnimationFrame but it's not dependant on it for timing.  So instead of incrementing something every frame i.e. x++; which won't be incremented consistently if you have varying framerates as they are dependant on many factors.  A persons hardware, other resources being utilized, the complexity of your update/render loop, etc. all factor into your eventual frames per second.  There's no way I've found to guarantee 60fps.  With this timer the fps don't matter as much and can vary.

The timer object itself is very simple still, with a very simple api.  As the complexity grows the chance for the timer itself to impact performance grows as well.  That is something I want to avoid.

The index.html is a simple render/update loop with requestAnimationFrame, including a little stub to generate the delta time and frames per second.

So far in the api:

```javascript

//The main timer function
var Timer = function(initialTicks) {

    //the starting amount of ticks for the timer
    this.initialTicks = initialTicks || 0;
    
    //internal last time the timer was updated
    this.lastTimestamp = 0;
    
    //the last time the timer was paused
    this.pausedTime = 0;
    
    //the current amount of elapsed ticks
    this.ticks = this.initialTicks || 0;
    
    //amount the counter should count up or down, 1 resolves to 1 second in general
    this.maxStep = 1;
    
    //wether or not the timer should count up or down
    this.increment = true;
    
    //How fast/slow the timer increments/decrements
    this.scale = 1.0;
    
    //is the timer paused
    this.paused = false;

};


//The function to call in the update portion of your game loop
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

//returns an object containing the hours minutes and seconds of the timer
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

//pause the timer or unpause the timer
Timer.prototype.pause = function() {
    if (!this.paused) {
        this.pausedTime = this.ticks;
        this.paused = true;
    }
    else {
        this.paused = false;
    }
};

//reset, but not stop, the timer
Timer.prototype.reset = function() {
    this.ticks = this.initialTicks;
};

//start the timer if stopped or paused
Timer.prototype.start = function() {
    this.paused = false;
};

//stop the timer and reset it
Timer.prototype.stop = function() {
    this.pause();
    this.reset();

};
```
