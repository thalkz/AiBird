var networks = [];
var genomes = [];
var generation = 0;
var innovation_number = 0;

var population = 500;

function init_neat() {
    first_generation();
    build_networks();
}

function update_neat() {

    for (i = 0; i < population; i++) {
            networks[i].refresh_input();
            networks[i].add_bird_input(birds[i].x, height - birds[i].y);
        
            if (networks[i].should_jump()) {
                birds[i].jump();
            }
    }
}

function render_neat() {
   networks[0].render();
}

function first_generation() {
    genomes = [];
    for (var i = 0; i < population; i++) {
        genomes.push(new Genome(i));
        genomes[i].mutate();
    }
}

function build_networks() {
    networks = [];    
    for (i = 0; i < population; i++) {
        n = new Network();
        n.init(genomes[i]);
        networks.push(n);
    }
}

function next_generation() {
    generation++;
    var new_genomes = [];
    var champ = get_champion();
    champ.id = 0;
    new_genomes.push(champ);

    for (var i = 1; i < population; i++) {
        var g = champ.copy(i);
        g.mutate();
        g.mutate();
        g.mutate();
        new_genomes.push(g);
    }

    genomes = new_genomes;

    build_networks();
}

function get_champion() {
    var result;
    var best = 0;
    for (i = 0; i < population; i++) {
        if (genomes[i].fitness > best) {
            best = genomes[i].fitness;
            result = genomes[i];
        }
    }
    return result;
} 

function range(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}