function update_player() {
    var output = graph.getOutput();
    if (output > 0.5) {
        clicked = true;
    }
}

function render_player() {
    graph.draw();

    Draw.text(score.distance, 10, 20, 14, "#FFFFFF");

    Draw.text("Generation : " + generation_index, 10, 40, 14, "#FFFFFF");
    Draw.text("Species : " + species_index, 10, 60, 14, "#FFFFFF");
    Draw.text("Genome : " + genome_index, 10, 80, 14, "#FFFFFF");
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-4.9 * x));
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Node(x, y, type) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.value = null;
    this.weights = [];
    this.nodes = [];

    this.getValue = function () {
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

    this.draw = function () {
        Draw.rect(this.x, this.y, cellSize - 1, cellSize - 1, '#FFFFFF');

        for (var i = 0; i < this.nodes.length; i++) {

            context.beginPath();
            context.moveTo(this.x + cellSize / 2, this.y + cellSize / 2);
            context.lineTo(this.nodes[i].x + cellSize / 2, this.nodes[i].y + cellSize / 2);

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

    this.init = function (hidden_count) {
        for (var i = 0; i < cols; i++) {
            this.input_nodes[i] = [];
        }

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.input_nodes[i][j] = new Node(10 + cellSize * i, height - (10 + cellSize * j), 'input');
            }
        }

        this.output_node = new Node(width - 50, height - 50, 'output');

        for (var k = 0; k < hidden_count; k++) {
            this.hidden_nodes.push(new Node(getRandom(110, width - 70), getRandom(height - 130, height - 20), 'hidden'));
        }
    }

    this.addConnection = function (in_node, out_node, weight) {
        if (in_node < 150 && out_node == 0) {

            this.output_node.nodes.push(this.getInputNode(in_node));
            this.output_node.weights.push(weight);

        } else if (in_node > 150 && out_node == 0) {

            this.output_node.nodes.push(this.hidden_nodes[in_node - 151]);
            this.output_node.weights.push(weight);

        } else if (in_node <= 150 && out_node > 150) {

            this.hidden_nodes[out_node - 151].nodes.push(this.getInputNode(in_node));
            this.hidden_nodes[out_node - 151].weights.push(weight);

        }  else if (in_node > 150 && out_node > 150) {

            this.hidden_nodes[out_node - 151].nodes.push(this.hidden_nodes[in_node - 151]);
            this.hidden_nodes[out_node - 151].weights.push(weight);
        }
    }

    this.getInputNode = function (index) {

        if (index % cols != 0) {
            result = this.input_nodes[(index % cols) - 1][Math.floor(index / cols)];
        } else {
            result = this.input_nodes[9][(index / cols) - 1];
        }
        return result;
    }

    this.buildInput = function () {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.input_nodes[i][j].value = input_map[i][j];
            }
        }
    }

    this.getOutput = function () {
        this.buildInput();
        return this.output_node.getValue();
    }

    this.draw = function () {
        this.output_node.draw();
        Draw.text("Out", width - 40, height - 43, 9, "#FFFFFF");

        for (var k = 0; k < this.hidden_nodes.length; k++) {
            this.hidden_nodes[k].draw();
        }
    }
}