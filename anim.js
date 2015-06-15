/*
var tCx = {
    lastframe: 0,
    fpstime: 0,
    framecount: 0,
    fps: 0
};
tCx.updateFps = function(dt) {
    if (this.fpstime > 0.25) {
        this.fps = ((((this.framecount / this.fpstime) + 0.5) << 1) >> 1); //Math.round(this.framecount / this.fpstime);//((((var1 / var2) + 0.5) << 1) >> 1)
        this.fpstime = 0;
        this.framecount = 0;
    }
    this.fpstime += dt;
    this.framecount++;
};
tCx.getDT = function(tframe) {
    var dt = (tframe - this.lastframe) / 1000;
    this.lastframe = tframe;
    return this.updateFps(dt);
};
*/
console.log("tC loaded");
export var tC = {
    lastframe: 0,
    fpstime: 0,
    framecount: 0,
    fps: 0,
    updateFps: function(a) {
        .25 < this.fpstime && (this.fps = this.framecount / this.fpstime + .5 << 1 >> 1, this.framecount = this.fpstime = 0);
        this.fpstime += a;
        this.framecount++;
    },
    getDT: function(a) {
        var b = (a - this.lastframe) / 1E3;
        this.lastframe = a;
        return this.updateFps(b);
    }
};