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

