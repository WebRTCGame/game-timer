function Segment(width, height) {
    Renderable.apply(this, arguments);
    this.width = width;
    this.height = height;
    this.vx = 0;
    this.vy = 0;
    this.color = "#ffffff";
    this.lineWidth = 1;
    this.zIndex = 0;
};

Segment.prototype = Object.create(Renderable.prototype);

Segment.prototype.constructor = Segment;

Segment.prototype.draw = function(context) {
    var h = this.height,
        d = this.width + h, //top-right diagonal
        cr = h / 2; //corner radius

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(0, -cr);
    context.lineTo(d - 2 * cr, -cr);
    context.quadraticCurveTo(-cr + d, -cr, -cr + d, 0);
    context.lineTo(-cr + d, h - 2 * cr);
    context.quadraticCurveTo(-cr + d, -cr + h, d - 2 * cr, -cr + h);
    context.lineTo(0, -cr + h);
    context.quadraticCurveTo(-cr, -cr + h, -cr, h - 2 * cr);
    context.lineTo(-cr, 0);
    context.quadraticCurveTo(-cr, -cr, 0, -cr);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }

    this.drawPin1(context);
    this.drawPin2(context);

};
Segment.prototype.drawPin1 = function(context) {
    context.beginPath();
    context.arc(0, 0, 2, 0, (Math.PI * 2), true);
    context.closePath();
    context.stroke();
};
Segment.prototype.drawPin2 = function(context) {
    context.beginPath();
    context.arc(this.width, 0, 2, 0, (Math.PI * 2), true);
    context.closePath();
    context.stroke();
};
Segment.prototype.getPin = function() {
    return {
        x: this.x + Math.cos(this.rotation) * this.width,
        y: this.y + Math.sin(this.rotation) * this.width
    };
};

Segment.prototype.pinX = function() {
    return this.x + Math.cos(this.rotation) * this.width;
};
Segment.prototype.pinY = function() {
    return this.y + Math.sin(this.rotation) * this.width;
};