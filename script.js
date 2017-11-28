function init() {
    init_window();
    init_neat();
    init_input();
    reset_game();

    loop();
};

function loop() {
    window.requestAnimationFrame(loop);

    if (!pause) {
        update_game();
        update_input();
        update_player();

        render_game();
        render_input();
        render_player();
    }
}

function game_over() {
    next_genome();
    reset_game();
    init_input();
    // console.log(species[species_index].genomes[genome_index]);
    // console.log(graph);
}

function log_results() {

    var best = 0;
    for (var i = 0; i < species.length; i++) {
        var champ = species[i].getChampion();
        if (best < champ.fitness) {
            best = champ.fitness;
        }
    }

    console.log("Generation #" + generation_index + " : Best = " + best);
    for (var i = 0; i < species.length; i++) {
        var champ = species[i].getChampion();
        console.log("Species #" + i + " : Best = " + champ.fitness);
    }
}

window.addEventListener('load', init, false);