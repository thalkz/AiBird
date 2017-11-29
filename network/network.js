cellSize = 7;

function Network() {
    this.input_neurons = [];
    this.hidden_neurons = [];
    this.output_neuron;

    this.cols = 10;
    this.rows = 15;

    this.init = function (genome) {

        // Init input_neurons
        for (var j = 0; j < this.rows; j++) {        
            for (var i = 0; i < this.cols; i++) {
                this.input_neurons[(j * this.cols) + i] = new Neuron(i, j, 'input');
            }
        }

        // Init hidden_neurons        
        for (var k = 0; k < genome.hidden_count; k++) {
            this.hidden_neurons.push(new Neuron(range(20, 30), range(1, 14), 'hidden'));
        }

        // Init output_neuron
        this.output_neuron = new Neuron(40, 8, 'output');

        // Build network        
        for (var i = 0; i < genome.genes.length; i++) {
            var gene = genome.genes[i];
            if (gene.enabled) {
                this.add_connection(gene.in_type, gene.in_index, gene.out_type, gene.out_index, gene.weight);
            }
        }
    }

    this.add_connection = function (in_type, in_index, out_type, out_index, weight) {
        if (in_type == 'input') {

            if (out_type == 'hidden') {
                this.hidden_neurons[out_index].add_connection(this.input_neurons[in_index], weight);
            } else if (out_type == 'output') {
                this.output_neuron.add_connection(this.input_neurons[in_index], weight);
            }

        } else if (in_type == 'hidden') {

            if (out_type == 'hidden') {
                this.hidden_neurons[out_index].add_connection(this.hidden_neurons[in_index], weight);                
            } else if (out_type == 'output') {
                this.output_neuron.add_connection(this.hidden_neurons[in_index], weight);            
            }
        }
    }

    this.should_jump = function () {
        return this.output_neuron.getValue() > 0.5;
    }

    this.refresh_input = function () {
        for (var j = 0; j < rows; j++) {        
            for (var i = 0; i < cols; i++) {
                this.input_neurons[(j * this.cols) + i].value = input_map[i][j];
            }
        }
    }

    this.add_bird_input = function (bird_x, bird_y) {
        var x = Math.floor(bird_x / 32);
        var y = Math.floor(bird_y / 32);

        this.input_neurons[(y * this.cols) + x].value = 1;
    }

    this.render = function () {
        for (i = 0; i < this.input_neurons.length; i++) {
            this.input_neurons[i].render();
        }

        for (i = 0; i < this.hidden_neurons.length; i++) {
            this.hidden_neurons[i].render();
        }

        this.output_neuron.render();        
    }
}