var width = 320;
var height = 480;
var canvas = null;
var context = null;

var entities = [];

var score = {
    distance: 0,
    clicks: 0,
};

var clicked = false;
var grad = null;
var floorHeight = 150;

var pause = false;

/*
* INIT WINDOW
*/

function init_window() {
    var ratio = width / height;
    canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    currentHeight = window.innerHeight - 10;
    currentWidth = currentHeight * ratio;
    canvas.style.width = currentWidth + 'px';
    canvas.style.height = currentHeight + 'px';

    grad = context.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#69a');
    grad.addColorStop(0.5, '#9cd');
    grad.addColorStop(1, '#fff');

    window.addEventListener('click', function (e) {
        e.preventDefault();
        pause = !pause;
    }, false);
}

/*
* RESET GAME
*/

function reset_game() {
    entities = [];
    score.distance = 0;
    score.clicks = 0;

    for (i = 0; i < 2; i += 1) {
        entities.push(new BottomBar(width * i, height - floorHeight, width));
    }

    entities.push(new Pipe(width, 50, 200));
    entities.push(new Pipe(width + width / 2, 50, 150));
    entities.push(new Pipe(width * 2, 50, 100));

    bird = new Bird();
    entities.push(bird);
}

/*
* UPDATE GAME
*/

function update_game() {
    Draw.clear();

    score.distance += 1;

    if (clicked) {
        score.clicks += 1;
    }

    for (i = 0; i < entities.length; i += 1) {
        entities[i].update();
        if (entities[i].type === 'pipe') {
            var hit = isColliding(bird, entities[i]);
            if (hit) {
                game_over();
                break;
            }
        }
    }

    clicked = false;
}

/*
* RENDER GAME
*/

function render_game() {
    Draw.rect(0, 0, width, height, grad);

    for (i = 0; i < entities.length; i += 1) {
        entities[i].render();
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
* Bird Object
*/

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

/*
* BottomBar Object
*/

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

/*
* Pipe Object
*/

function Pipe(x, w, centerY) {
    this.type = 'pipe';

    this.centerX = x;
    this.centerY = centerY;
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
        Draw.rect(this.centerX, 0, this.w, this.centerY - 70, '#8ED6FF');
        Draw.rect(this.centerX, this.centerY + 70, this.w, this.h - this.centerY, '#8ED6FF');
    }

    this.respawn = function () {
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
    var upy2 = pipe.centerY - 70;


    var lpx1 = pipe.centerX;
    var lpy1 = pipe.centerY + 70;
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