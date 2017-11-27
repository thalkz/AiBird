function sigmoid(x) {
    return 1 / (1 + Math.exp(-4.9 * x));
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function Node(x, y) {
    this.x = x;
    this.y = y;
    this.value = null;
    this.weights = [];
    this.nodes = [];

    this.getValue = function() {
        if (this.nodes.length == 0) {
            return this.value;
        }

        var sum = 0;
        var activated = false;

        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].getValue() != null) {
                activated = true;
                sum += this.weights[i] * this.nodes[i].getValue();
            }
        }

        if (!activated) {
            return null; // null value means deactivated
        }

        return sigmoid(sum);
    }

    this.draw = function() {
        Draw.rect(this.x, this.y, cellSize-1, cellSize-1, '#FFFFFF'); 

        context.beginPath();
        context.moveTo(this.x + cellSize / 2,this.y + cellSize / 2);

        for (var i = 0; i < this.nodes.length; i++) {
            context.lineTo(this.nodes[i].x + cellSize / 2,this.nodes[i].y + cellSize / 2);

            if (this.nodes[i].getValue() == null) {
                context.strokeStyle = '#424242';
            } else if (this.weights[i] < 0) {
                context.strokeStyle = '#ff0000';
            } else {
                context.strokeStyle = '#00ff00';
            }
            context.stroke();
        }
    }
}

function Graph() {
    this.input_nodes = [];
    this.hidden_nodes = [];
    this.output_node;

    this.init = function() {
        for (var i = 0; i < cols; i++) {
            this.input_nodes[i] = [];
        }

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.input_nodes[i][j] = new Node(10 + cellSize*i, height - (10 + cellSize*j));
            }
        }

        for (var k = 0; k < 10; k++) {
            this.hidden_nodes.push(new Node(getRandom(110, width-70), getRandom(height- 130, height-20)));
        }

        this.output_node = new Node(width - 50, height - 50);

        // For testing
        this.output_node.nodes.push(this.hidden_nodes[0]);
        this.output_node.weights.push(1.0);

        this.hidden_nodes[0].nodes.push(this.input_nodes[2][7]);
        this.hidden_nodes[0].weights.push(1.0);
    }

    this.buildInput = function() {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.input_nodes[i][j].value = input_map[i][j];
            }
        }
    }

    this.getOutput = function() {
        this.buildInput();
        return this.output_node.getValue();
    }

    this.draw = function() {
        this.output_node.draw();
        Draw.text("Out", width - 40, height - 43, 9, "#FFFFFF");

        for (var k = 0; k < this.hidden_nodes.length; k++) {
            this.hidden_nodes[k].draw();
        }
    }
}