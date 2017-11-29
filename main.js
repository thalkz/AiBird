var game_paused = false;

function init() {
    // Executed once when the window is opened

    listen_pause_click();
    init_input();
    init_canvas();
    init_neat();
    reset_game();
    
    loop();
};

function loop() {
    // Executed every frame

    window.requestAnimationFrame(loop);

    if (game_paused) {
        return;
    }

    update_input();    
    update_game();


    render_game();
    render_neat();
    update_neat();
}

function game_over() {
    // Executed when all birds have died
    log_results();
    reset_game();
    next_generation();
}

function log_results() {
    console.log("Generation #" + generation);
    console.log("Best = " + get_champion().fitness);
}

function listen_pause_click() {
    window.addEventListener('click', function (e) {
        e.preventDefault();
        game_paused = !game_paused;
    }, false);
}

window.addEventListener('load', init, false);