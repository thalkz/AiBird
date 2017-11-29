var rows = 15;
var cols = 10;

var input_map = [];

var INPUT_EMPTY = null;
var INPUT_BIRD = 1;
var INPUT_COLLIDER = -1;

/*
* INIT INPUT
*/

function init_input() {
    for (var i = 0; i < cols; i++) {
        input_map[i] = [];
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            input_map[i][j] = INPUT_EMPTY;
        }
    }
}

/*
* UPDATE INPUT
*/

function update_input() {

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            input_map[i][j] = INPUT_EMPTY;
            if (j < 5) {
                input_map[i][j] = INPUT_COLLIDER;
            }
        }
    }

    for (k = 0; k < pipes.length; k++) {
        x = Math.floor((pipes[k].centerX + 16) / 32);
        y = Math.floor((height - pipes[k].centerY) / 32);

        if (x >= 0 && x < 10) {

            for (j = 0; j < rows; j++) {
                input_map[x][j] = INPUT_COLLIDER;
            }

            input_map[x][y - 2] = INPUT_EMPTY;
            input_map[x][y - 1] = INPUT_EMPTY;
            input_map[x][y] = INPUT_EMPTY;
        }
    }
}