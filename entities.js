function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Bird() {
    this.type = 'bird';    
    this.img = new Image();
    this.img.src = 'img/bird.png';
    this.frame = 0;
    this.spriteX = 0;
    this.spriteY = 0;

    this.width = 34;
    this.height = 24;

    this.y = 130;
    this.x = 70;

    this.velocity = 0;
    this.rotation = 0;    

    this.gravity = 0.25;
    this.jump = -4.6;

    this.update = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y <= 1) {
            this.y = 1;
        }

        if (this.y >= height - floorHeight) {
            this.y = height - floorHeight;
        }

        this.rotation = Math.min((this.velocity / 10) * 90, 90);

        if (clicked) {
            this.velocity = this.jump;
        }
    };

    this.render = function () {
        if (this.frame++ > 5) {
            this.frame = 0;
            if (this.spriteY == this.height * 3) {
                this.spriteY = 0
            }
            this.spriteY += this.height;
        }

        Draw.Sprite(this.img, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height, this.rotation);
    }
}

function BottomBar(x, y, r) {
    this.name = 'BottomBar';
    
    this.x = x;
    this.y = y;

    this.r = r;
    this.vx = -1;

    this.update = function () {
        this.x += this.vx;
        if (this.x < (0 - this.r)) {
            this.respawn();
        }
    };

    this.render = function () {
        Draw.rect(this.x, this.y, this.r, floorHeight, '#D2691E');
        for (var i = 0; i < 10; i++) {
            Draw.semiCircle(this.x + i * (this.r / 9), this.y, 20, '#050');
        }
    }

    this.respawn = function () {
        this.x = width - 1;
    }
}

function Pipe(x, w) {
    this.type = 'pipe';
    
    this.centerX = x;
    this.centerY = randomIntFromInterval(70, 220);  
    this.w = w;
    this.h = height - 200;
    this.vx = -1;

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
        this.centerY = randomIntFromInterval(70, 220);
        this.centerX = 320 - this.w + 160;
    }      
}

function isColliding(bird, pipe) {
    if (bird.y >= height - floorHeight) {
        return true;
    }

    var bx1 = bird.x - bird.width / 2;
    var by1 = bird.y - bird.height / 2;
    var bx2 = bird.x + bird.width / 2;
    var by2 = bird.y + bird.height / 2;

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