var population = 150;
var species = [];

var generation_index = 1;
var species_index = 0;
var genome_index = 0;

var innocation_number = 0;

function init_neat() {
    species = create_first_generation();
    graph = buildGraph(species[0].genomes[0]);
}

function create_first_generation() {
    var new_species = [];
    for (var i = 0; i < 10; i++) {
        var s = new Species();
        for (var j = 0; j < 5; j++) {
            s.addGenome(mutate(new Genome()));
        }
        new_species.push(s)
    }
    return new_species;
}

function next_genome() {

    species[species_index].genomes[genome_index].fitness = score.distance;

    if (genome_index < species[species_index].genomes.length - 1) {

        genome_index++;

    } else if (species_index < species.length - 1) {

        species_index++;
        genome_index = 0;

    } else {

        log_results();
        species = create_new_generation();
        generation_index++;
        species_index = 0;
        genome_index = 0;
    }

    graph = buildGraph(species[species_index].genomes[genome_index]);
}

function create_new_generation() {
    var new_species = [];
    for (var i = 0; i < 10; i++) {
        var s = new Species();

        var champion = species[i].getChampion();
        s.addGenome(champion);

        for (var j = 0; j < 4; j++) {
            s.addGenome(mutate(champion));
        }

        new_species.push(s)
    }
    return new_species;
}

function Species() {
    this.size = 0;
    this.genomes = [];

    this.addGenome = function (g) {
        this.genomes.push(g);
    }

    this.getChampion = function () {
        var max = 0;
        var selected = 0;

        for (var i = 0; i < this.genomes.length; i++) {
            if (this.genomes[i].fitness > max) {
                max = this.genomes[i].fitness;
                selected = i;
            }
        }
        return this.genomes[selected];
    }

    this.getChampionIndex = function () {
        var max = 0;
        var selected = 0;

        for (var i = 0; i < this.genomes.length; i++) {
            if (this.genomes[i].fitness > max) {
                max = this.genomes[i].fitness;
                selected = i;
            }
        }
        return selected;
    }
}

// node #0 = output
// node #1 to node #150 = input
// node > #150 = hidden_nodes

function Genome() {
    this.genes = [];
    this.hidden_nodes_count = 0;
    this.fitness = 0;

    this.addGene = function (in_node, out_node, weight, enabled) {
        innocation_number++;
        this.genes.push(new Gene(in_node, out_node, weight, enabled, innocation_number));
    }

    this.addHiddenNodeAtGene = function (index) {
        if (this.genes[index].enabled) {
            this.genes[index].enabled = false;

            this.hidden_nodes_count++;

            innocation_number++;
            this.genes.push(new Gene(this.genes[index].in_node, 150 + this.hidden_nodes_count, this.genes[index].weight, true, innocation_number));

            innocation_number++;
            this.genes.push(new Gene(150 + this.hidden_nodes_count, this.genes[index].out_node, this.genes[index].weight, true, innocation_number));

        }
    }

    this.copy = function () {
        var copied = new Genome();
        for (var i = 0; i < this.genes.length; i++) {
            copied.addGene(this.genes[i].in_node, this.genes[i].out_node, this.genes[i].weight, this.genes[i].enabled);
        }
        copied.hidden_nodes_count = this.hidden_nodes_count;
        return copied;
    }
}

function Gene(in_node, out_node, weight, enabled, innovation) {
    this.in_node = in_node;
    this.out_node = out_node;
    this.weight = weight;
    this.enabled = enabled;
    this.innovation = innovation;
}

function buildGraph(genome) {
    var graph = new Graph();
    graph.init(genome.hidden_nodes_count);

    for (var i = 0; i < genome.genes.length; i++) {
        var gene = genome.genes[i];
        if (gene.enabled) {
            graph.addConnection(gene.in_node, gene.out_node, gene.weight);
        }
    }
    return graph;
}

function mutate(g) {
    result = g.copy();

    // 30% Add Connection
    if (Math.random() < 0.5 || result.genes.length == 0) {
        var in_node = getRandom(51, 150);
        var out_node = 0;
        var weight = (Math.random() * 2) - 1;
        result.addGene(in_node, out_node, weight, true);
    }

    // 20% Add Node
    if (Math.random() < 0.3 && result.genes.length > 0) {
        var index = randomIntFromInterval(0, result.genes.length - 1);
        result.addHiddenNodeAtGene(index);
    }

    // 80% Mutate weights
    if (Math.random() < 0.8) {
        for (var i = 0; i < result.genes.length; i++) {
            result.genes[i].weight += Math.random() * 0.1;
        }
    }

    return result;
}