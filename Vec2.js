var Vec2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.hamada = [];
    var that = this;
    
    this.add = function (a, b) {
        ///<param name='a' type="Vec2">first vector </param>
        ///<param name='b' type="Vec2">second vector </param>
        b = b || that;
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        var v = new Vec2(a.x+b.x, a.y+b.y);
        return v;

    };
    
    this.sub = function (a, b) {
        ///<param name='a' type="Vec2">first vector </param>
        ///<param name='b' type="Vec2">second vector </param>
        b = b || that;

        this.x = a.x - b.x;
        this.y = a.y - b.y;
        var v = new Vec2(a.x - b.x, a.y - b.y);
        return v;

    };

    this.dot = function (a, b) {
        ///<param name='a' type="Vec2">first vector </param>
        ///<param name='b' type="Vec2">second vector </param>
        b = b || this;
        return a.x * b.x + a.y * b.y;
    };
    this.scale = function (s) {
        return new Vec2(this.x*s,this.y*s);
    }
    this.magnitude = function () {
        return Math.sqrt(that.x * that.x + that.y * that.y);
    };
    this.magnitude2 = function () {
        return (that.x * that.x + that.y * that.y);
    };


    this.normalize = function () {
        var v = this.normalized();
        this.x = v.x;
        this.y = v.y;
        return this;
    };

    this.normalized = function () {
        var m = that.magnitude();
        var v = new Vec2(this.x/m, this.y/m);
        return v;
    };
    this.normal = function () {
        return (new Vec2(this.y, -this.x)).normalized();
    }
}
var vec2 = Vec2;