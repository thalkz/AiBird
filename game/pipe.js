function Pipe(x, w, centerY) {
    this.type = 'pipe';

    this.centerX = x;
    this.centerY = centerY;

    this.opening = 96;

    this.w = w;
    this.h = height - floorHeight;
    this.vx = -1;

    this.update = function () {
        this.centerX += this.vx;
        if (this.centerX == (0 - this.w)) {
            this.respawn();
        }
    };

    this.render = function () {
        Draw.rect(this.centerX, 0, this.w, this.centerY - this.opening / 2, '#8ED6FF');
        Draw.rect(this.centerX, this.centerY + this.opening / 2, this.w, this.h - centerY - this.opening / 2, '#8ED6FF');
    }

    this.respawn = function () {
        this.centerX = 320 - this.w + 160;
    }

    this.can_collide = function() {
        return (this.centerX > 20 && this.centerX < 100);
    }
}