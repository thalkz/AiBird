function Neuron(x_pos, y_pos, type) {
    this.type = type; // 'input', 'hidden' or 'output'

    this.x = x_pos * cellSize + 10;
    this.y = height - (y_pos * cellSize) - 20;

    // for 'input' neurons
    this.value = null;

    // for 'hidden' and 'output' neurons
    this.weights = []; 
    this.connected_neurons = [];

    this.getValue = function () {
        
        if (this.type == 'input') {
            return this.value;
        }

        var sum = 0;
        var activated = false;

        for (var i = 0; i < this.connected_neurons.length; i++) {
            if (this.connected_neurons[i].getValue() != null) {
                activated = true;
                sum += this.weights[i] * this.connected_neurons[i].getValue();
            }
        }

        if (!activated) {
            return null; // null value means deactivated
        }

        return sigmoid(sum);
    }

    this.add_connection = function(neuron, weight) {
        this.connected_neurons.push(neuron);
        this.weights.push(weight);
    } 

    this.render = function () {
        
        // Draw neuron

        if (this.type == 'input') {
            if (this.value == -1) {
                Draw.rect(this.x, this.y, cellSize - 1, cellSize - 1, '#000000');                
            } else if (this.value == 1) {
                Draw.rect(this.x, this.y, cellSize - 1, cellSize - 1, '#FFFFFF');                                
            }
        } else {
            Draw.rect(this.x, this.y, cellSize - 1, cellSize - 1, '#FFFFFF');            
        }

        // Draw connections
        for (var i = 0; i < this.connected_neurons.length; i++) {

            context.beginPath();
            context.moveTo(this.x + cellSize / 2, this.y + cellSize / 2);
            context.lineTo(this.connected_neurons[i].x + cellSize / 2, this.connected_neurons[i].y + cellSize / 2);

            if (this.connected_neurons[i].getValue() == null) {
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

function sigmoid(x) {
    return 1 / (1 + Math.exp(-4.9 * x));
}