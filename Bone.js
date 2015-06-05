var Bone = function(){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.rotation = 0;
    this.scaleX = 0;
    this.scaleY = 0;
    this.vX = 0;
    this.vY = 0;
    this.zIndex = 0;
    return this;
};

Bone.prototype.getPin = function() {
    return {
        x: this.x + Math.cos(this.rotation) * this.width,
        y: this.y + Math.sin(this.rotation) * this.width
    };
};

Bone.prototype.pinX = function() {
    return this.x + Math.cos(this.rotation) * this.width;
};
Bone.prototype.pinY = function() {
    return this.y + Math.sin(this.rotation) * this.width;
};

Bone.prototype.update = function(){};
Bone.prototype.render = function(){};