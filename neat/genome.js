function Genome(id) {
    this.id = id;
    this.genes = [];
    this.hidden_count = 0;
    this.fitness = 0;

    this.add_gene = function (in_type, in_index, out_type, out_index, weight, enabled) {
        innovation_number++;
        this.genes.push(new Gene(in_type, in_index, out_type, out_index, weight, enabled, innovation_number));
    }

    this.mutate = function() {
    
        // Add Connection
        if (Math.random() < 0.3 || this.genes.length == 0) {
            this.add_connection_mutation();
        }
    
        // Add Neuron
        if (Math.random() < 0.1) {
            this.add_neuron_mutation();
        }
    
        // Mutate weights
        if (Math.random() < 0.8) {
            this.weights_mutation();
        }
    }

    // !!! THIS ONLY CREATES A CONNECTION BETWEEN INPUT NEURONS AND THE OUTPUT NEURON
    this.add_connection_mutation = function() {
        var in_index = range(51, 150);
        var in_type = 'input';

        if (Math.random() < 0.5 || this.hidden_count == 0) {
            var out_index = 0;
            var out_type = 'output';
        } else {
            var out_index = range(0, this.hidden_count - 1);
            var out_type = 'hidden';
        }

        var weight = (Math.random() * 2) - 1;

        this.add_gene(in_type, in_index, out_type, out_index, weight, true);
    }

    this.add_neuron_mutation = function () {
        var index = range(0, this.genes.length - 1);
        var gene = this.genes[index];

        if (gene.enabled) {
            gene.enabled = false;

            var mid_type = 'hidden';
            var mid_index = this.hidden_count;

            this.add_gene(gene.in_type, gene.in_index, mid_type, mid_index, 1, true);
            this.add_gene(mid_type, mid_index, gene.out_type, gene.out_index, gene.weight, true);

            this.hidden_count++;
        }
    }

    this.weights_mutation = function() {
        for (var i = 0; i < this.genes.length; i++) {
            this.genes[i].weight += Math.random() - 0.5;
        }
    }

    this.copy = function (id) {
        var result = new Genome(id);
        result.hidden_count = this.hidden_count;
        for (i = 0; i < this.genes.length; i++) {
            var k = new Gene(this.genes[i].in_type, this.genes[i].in_index, this.genes[i].out_type, this.genes[i].out_index, this.genes[i].weight, this.genes[i].enabled, this.genes[i].innovation);
            result.genes.push(k);
        }
        return result;
    }
}

