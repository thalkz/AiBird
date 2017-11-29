var width = 320;
var height = 480;
var canvas = null;
var context = null;

var birds = [];
var pipes = [];

var grad = null;
var floorHeight = 32 * 4;

var pause = false;
var birds_alive;
var distance = 0;

/*
* INIT WINDOW
*/

function init_canvas() {
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
}

/*
* RESET GAME
*/

function reset_game() {
    birds = [];
    pipes = [];
    distance = 0;
    birds_alive = population;

    pipes.push(new Pipe(width * 2, 32, 32 * 3));    
    pipes.push(new Pipe(width, 32, 32 * 7));
    pipes.push(new Pipe(width * 1.5, 32, 32 * 5));

    for (var i = 0; i < population; i++) {
        birds.push(new Bird(i));
    }
}

/*
* UPDATE GAME
*/

function update_game() {
    distance += 1;

    // update pipes
    for (i = 0; i < pipes.length; i++) {
        pipes[i].update();
    }

    // update birds
    for (i = 0; i < birds.length; i++) {
        birds[i].update();
    }

    // check ground collision
    check_ground_collision();    

    // check pipe collisions
    for (i = 0; i < pipes.length; i++) {
        if (pipes[i].can_collide()) {
            check_pipe_collisions(pipes[i]);
        }
    }

    if (birds_alive <= 0) {
        game_over();
    }
}

/*
* RENDER GAME
*/

function render_game() {
    Draw.clear();

    // render background
    Draw.rect(0, 0, width, height, grad);

    // render bottom
    Draw.rect(0, height - floorHeight, width, floorHeight, "#888888");

    // render pipes
    for (i = 0; i < pipes.length; i++) {
        pipes[i].render();
    }

    // render birds
    for (i = 0; i < birds.length; i++) {
        birds[i].render();
    }
}

function check_ground_collision() {
    for (j = 0; j < birds.length; j++) {
        if (birds[j].is_alive && birds[j].y >= height - floorHeight) {
            birds[j].kill();
        }
    }
}

function check_pipe_collisions(pipe) {
    for (j = 0; j < birds.length; j++) {
        if (birds[j].is_alive) {
            if (is_colliding(birds[j], pipe)) {
                birds[j].kill();
            }
        }
    }
}

function is_colliding(bird, pipe) {

    var bx1 = bird.x - bird.width / 2;
    var by1 = bird.y - bird.height / 2;
    var bx2 = bird.x + bird.width / 2;
    var by2 = bird.y + bird.height / 2;

    var upx1 = pipe.centerX;
    var upy1 = 0;
    var upx2 = pipe.centerX + pipe.w;
    var upy2 = pipe.centerY - pipe.opening / 2;

    var lpx1 = pipe.centerX;
    var lpy1 = pipe.centerY + pipe.opening / 2;
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