function Bird() {
    this.img = new Image();
    this.img.src = 'img/bird.png';
    this.gravity = 0.25;
    this.width = 34;
    this.height = 24;
    this.ix = 0;
    this.iy = 0;
    this.fr = 0;
    this.vy = 180;
    this.vx = 70;
    this.velocity = 0;
    this.play = false;
    this.jump = -4.6;
    this.rotation = 0;
    this.type = 'bird';

    this.update = function () {
        if (this.fr++ > 5) {
            this.fr = 0;
            if (this.iy == this.height * 3) {
                this.iy = 0
            }
            this.iy += this.height;
        }
        if (this.play) {
            this.velocity += this.gravity;
            this.vy += this.velocity;
            if (this.vy <= 0) {
                this.vy = 0;
            }
            if (this.vy >= 370) {
                this.vy = 370;
            }
            this.rotation = Math.min((this.velocity / 10) * 90, 90);
        }
        if (clicked) {
            this.play = true;
            this.velocity = this.jump;
        }
    };

    this.render = function () {
        Draw.Sprite(this.img, this.ix, this.iy, this.width, this.height, this.vx, this.vy, this.width, this.height, this.rotation);
    }
}

function BottomBar(x, y, r) {
    this.x = x;
    this.y = y
    this.r = r;
    this.vx = -1;
    this.name = 'BottomBar';

    this.update = function () {
        this.x += this.vx;
        if (this.x < (0 - this.r)) {
            this.respawn();
        }
    };

    this.render = function () {
        Draw.rect(this.x, this.y, this.r, 100, '#D2691E');
        for (var i = 0; i < 10; i++) {
            Draw.semiCircle(this.x + i * (this.r / 9), this.y, 20, '#050');
        }
    }

    this.respawn = function () {
        this.x = width - 1;
    }
}

function Pipe(x, w) {
    this.centerX = x;
    this.w = w;
    this.h = height - 150;
    this.vx = -1;
    this.type = 'pipe';

    this.update = function () {
        this.centerX += this.vx;
        if (this.centerX == (0 - this.w)) {
            this.respawn();
        }
    };

    this.render = function () {
        Draw.rect(this.centerX, 0, this.w, this.centerY - 50, '#8ED6FF');
        Draw.rect(this.centerX, this.centerY + 50, this.w, this.h - this.centerY, '#8ED6FF');
    }

    this.respawn = function () {
        this.centerY = this.randomIntFromInterval(70, 220);
        this.centerX = 320 - this.w + 160;
    }

    this.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    this.centerY = this.randomIntFromInterval(70, 220);        
}

function isColliding(bird, pipe) {
    if (bird.vy >= 370) {
        return true;
    }

    var bx1 = bird.vx - bird.width / 2;
    var by1 = bird.vy - bird.height / 2;
    var bx2 = bird.vx + bird.width / 2;
    var by2 = bird.vy + bird.height / 2;

    var upx1 = pipe.centerX;
    var upy1 = 0;
    var upx2 = pipe.centerX + pipe.w;
    var upy2 = pipe.centerY - 50;


    var lpx1 = pipe.centerX;
    var lpy1 = pipe.centerY + 50;
    var lpx2 = upx2;
    var lpy2 = pipe.h;

    var c1 = !(bx1 > upx2 ||
        bx2 < upx1 ||
        by1 > upy2 ||
        by2 < upy1)
    var c2 = !(bx1 > lpx2 ||
        bx2 < lpx1 ||
        by1 > lpy2 ||
        by2 < lpy1)

    return (c1 || c2)
};