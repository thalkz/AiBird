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

function init() {
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
        clicked = true;
    }, false);

    resetGame();
    loop();
};

function resetGame() {
    entities = [];
    score.distance = 0;    
    score.clicks = 0;

    for (i = 0; i < 2; i += 1) {
        entities.push(new BottomBar(width * i, height - floorHeight, width));
    }

    entities.push(new Pipe(width, 50));
    entities.push(new Pipe(width + width / 2, 50));
    entities.push(new Pipe(width * 2, 50));

    bird = new Bird();
    entities.push(bird);

    initMap();    
}

function loop() {
    window.requestAnimationFrame(loop);
    update();
    render();
    createMap();
    drawMap();
}

function update() {
    score.distance += 1;

    if (clicked) {
        score.clicks += 1;
    }

    for (i = 0; i < entities.length; i += 1) {
        entities[i].update();
        if (entities[i].type === 'pipe') {
            var hit = isColliding(bird, entities[i]);
            if (hit) {
                gameOver();
                break;
            }
        }
    }

    clicked = false;        
}

function render() {
    Draw.rect(0, 0, width, height, grad);

    for (i = 0; i < entities.length; i += 1) {
        entities[i].render();
    }

    Draw.text(score.distance, 10, 20, 14, "#FFFFFF");
}

function gameOver() {
    console.log(score);
    resetGame();
}

window.addEventListener('load', init, false);