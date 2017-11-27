var cols = 10;
var rows = 15;
var cellSize = 8;
var input = [];

var INPUT_EMPTY = 0;
var INPUT_BIRD = 1;
var INPUT_COLLIDER = 2;

function initMap() {

    for (var i = 0; i < cols; i++) {
            input[i] = [];
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            input[i][j] = INPUT_EMPTY;
        }
    }
}

function createMap() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (j < rows * floorHeight / height) {
                input[i][j] = INPUT_COLLIDER;                
            } else {
                input[i][j] = INPUT_EMPTY;   
                for (var k = 0; k < entities.length; k++) {
                    if (entities[k].type == 'pipe' && isFromPipe(entities[k], i, j)) {
                        input[i][j] = INPUT_COLLIDER;    
                    }
                }           
            }
        }
    }

    input[Math.floor(cols * bird.x / width)][Math.floor(rows - rows * bird.y / height)] = INPUT_BIRD;   
}

function isFromPipe(pipe, i, j) {
    var x = width * i/cols;
    var y = height * (rows - j)/rows;
    if (x < pipe.centerX || x > pipe.centerX + pipe.w) {
        return false;
    }  else {
        if (y > pipe.centerY + 50 || y < pipe.centerY - 50) {
            return true;
        } else {
            return false;            
        }
    }
}

function drawMap() {
    Draw.rect(5, height - rows*cellSize - 10, cols*cellSize + 10, rows*cellSize + 10, '#FFFFFF55'); 
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (input[i][j] == INPUT_BIRD) {
                Draw.rect(10 + cellSize*i, height - (10 + cellSize*j), cellSize-1, cellSize-1, '#FFFFFF');                            
            } else if (input[i][j] == INPUT_COLLIDER) {
                Draw.rect(10 + cellSize*i, height - (10 + cellSize*j), cellSize-1, cellSize-1, '#000000');                                            
            }
        }
    }
}