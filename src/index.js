import Shuttle from "./shuttle";
import Fire from "./fire";
import Enemy from "./enemies";
import PageCreator from "./pageCreator"
import { setClassAndTitle } from "./utility";
import {
    ROW,
    COL,
    END_GAME_MODAL,
    WORLD_ID,
    SCORE_ID,
    LIFE_ID,
    TOTAL_SCORE_ID,
    START_GAME_BUTTON_ID,
    NEW_GAME_BUTTON_ID,
    EMPTY_CELL_TITLE,
    EMPTY_CELL_CLASS,
    PLAY_PAUSE_GAME_BUTTON_ID,
    RESTART_GAME_BUTTON_ID,
    COUNTDOWN_MODAL,
    COUNTDOWN_TIMER,
    RESTART_MODAL,
    RESTART_BUTTON_ID,
    CONTINUE_BUTTON_ID,
} from "./config"

let shuttle = null;

let score = 0;
let life = 3;

let enemyMoveSpeed = 200;
let enemySpawnSpeed = 1000;

let respawnIntervall = null;
let enemiesIntervall = null;

let stopExecution = false;
let playPauseExecution = false;

// Creates the space table and set id, title and the class to each cell
const createSpace = () => {

    const table = document.getElementById(WORLD_ID);
    for (let i = 1; i <= ROW; i++) {

        const tr = document.createElement("tr");
        for (let e = 1; e <= COL; e++) {

            const td = document.createElement("td");
            td.id = i + "-" + e;
            setClassAndTitle(td, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE);
            tr.appendChild(td);

        }

        table.appendChild(tr);
    }

    // instantiate a new Shuttle
    shuttle = new Shuttle();
    shuttle.createShuttle();

}

// Start the generation of enemies with a delay of 3 seconds
const startEnemies = () => {

    setTimeout(() => enemiesLoop(), 3000);

}

// Start the enemies spawn and movement 
const enemiesLoop = () => {


    // Set the respawn intervall of the enemies updating every 2 seconds the speed of movement and spawn.
    respawnIntervall = setInterval(() => {

        if (stopExecution) {

            clearInterval(respawnIntervall);
            enemyMoveSpeed = 200;
            enemySpawnSpeed = 1000;

        } else {

            clearInterval(enemiesIntervall)

            if (!playPauseExecution) {

                setEnemyIntervall();
                enemyMoveSpeed = enemyMoveSpeed - 2;
                enemySpawnSpeed = enemySpawnSpeed - 15;

            }

        }

    }, 2000);

}

// Intervall of the enemies. This intervall spawns enemies at every interation.
const setEnemyIntervall = () => {

    enemiesIntervall = setInterval(() => {

        if (stopExecution) clearInterval(enemiesIntervall);
        else {

            if (!playPauseExecution) {

                // Every time a enemy is spawned set the intervall for moving it.
                const enemy = new Enemy();

                const moveIntervall = setInterval(() => {

                    if (stopExecution) {

                        clearInterval(moveIntervall);
                        // clearInterval(enemiesIntervall)

                    } else {

                        if (!playPauseExecution) {

                            // if the enemy is not destroyed or not have a collision with the shuttle, the enemy is moved on the next cell
                            // else update score or life and stop the intervall of the enemy
                            if (enemy.x[0] >= 1 && !enemy.destroyed && !enemy.collision) enemy.moveEnemies()
                            else {

                                if (enemy.destroyed) updateScore()
                                if (enemy.collision) updateLife()
                                clearInterval(moveIntervall);

                            }

                        }

                    }

                }, enemyMoveSpeed);

            }

        }

    }, enemySpawnSpeed);

}

// Update the score and display it in the page
function updateScore() {

    score += 100;
    console.log(score);
    document.getElementById(SCORE_ID).innerText = score;

}


// Update the life and display it in the page
function updateLife() {

    life--;
    console.log(life);
    document.getElementById(LIFE_ID).innerText = life;

    // if life is egual to 0 end the game using the stopExecution variable
    if (life === 0) {

        stopExecution = true;
        $('#' + END_GAME_MODAL).modal("show");
        document.getElementById(TOTAL_SCORE_ID).innerText = score;

    }

}


// Restart the game after the end
const restartGame = () => {

    enemyMoveSpeed = 200;
    enemySpawnSpeed = 1000;

    score = -100;
    life = 4;

    updateScore();
    updateLife();

    // Reset the intervalls
    respawnIntervall = null;
    enemiesIntervall = null;

    // Hides the end game modal
    $('#' + END_GAME_MODAL).modal("hide");

    // Remove all elements from the space and re-creates it
    const table = document.getElementById(WORLD_ID);
    let child = table.lastElementChild;
    while (child) {
        table.removeChild(child);
        child = table.lastElementChild;
    }

    // Hides the end game modal
    $('#' + END_GAME_MODAL).modal("hide");
    $('#' + RESTART_MODAL).modal("hide");

    createSpace();

    // Reset the variables value
    stopExecution = false;
    playPauseExecution = false;

    // Start the enemies spwaning
    startEnemies();

}


// Keyboard event
const checkKey = ({ keyCode }) => {

    switch (keyCode) {

        case 38:
            // UpArrow Key: move shuttle above
            shuttle.moveUp();
            break;

        case 40:
            // DownArrow Key: move shuttle below
            shuttle.moveDown();
            break;

        case 32:
            // Space Key: shoot
            // Instantiates a new fire
            const fire = new Fire(shuttle);

            // call moveFire function that moves the fire in the space
            fire.moveFire();
            break;

        default:
            break;

    }

}

window.onload = function () {

    new PageCreator()

    document.getElementById(START_GAME_BUTTON_ID).addEventListener("click", () => {

        document.getElementById(START_GAME_BUTTON_ID).disabled = true;
        document.getElementById(PLAY_PAUSE_GAME_BUTTON_ID).disabled = false;
        document.getElementById(RESTART_GAME_BUTTON_ID).disabled = false;

        createSpace();

        // Start the enemies spwaning
        startEnemies();

    });

    document.getElementById(RESTART_GAME_BUTTON_ID).addEventListener("click", () => {

        playPauseExecution = true;

        $("#" + RESTART_MODAL).modal("show");

    });

    document.getElementById(PLAY_PAUSE_GAME_BUTTON_ID).addEventListener("click", () => {

        // If the game is already in pause shows a modal with a countdown
        if (playPauseExecution) {

            document.getElementById(PLAY_PAUSE_GAME_BUTTON_ID).innerText = "Pause";

            $("#" + COUNTDOWN_MODAL).modal("show");

            let timer = 3;
            document.getElementById(COUNTDOWN_TIMER).innerText = timer;

            const countdown = setInterval(() => {

                $("#" + COUNTDOWN_TIMER).text(--timer);
                if (timer == 0) {

                    $("#" + COUNTDOWN_MODAL).modal("hide");
                    playPauseExecution = false;
                    clearInterval(countdown);

                }

                console.log("here " + timer)

            }, 1000);

        }
        else {

            playPauseExecution = !playPauseExecution;
            document.getElementById(PLAY_PAUSE_GAME_BUTTON_ID).innerText = "Play";

        }

    });



    document.getElementById(NEW_GAME_BUTTON_ID).addEventListener("click", () => {

        // restart the game
        restartGame();

    });

    document.getElementById(RESTART_BUTTON_ID).addEventListener("click", () => {

        stopExecution = true;
    
        // restart the game
        // timeout is necessary to start the game with a delay foor stop every internal loop of previous run. 
        setTimeout(() =>  restartGame(), 1000);

    });

    document.getElementById(CONTINUE_BUTTON_ID).addEventListener("click", () => {

        $("#" + RESTART_MODAL).modal("hide");
        playPauseExecution = false;

    });

    // key event listener
    document.addEventListener("keydown", event => checkKey(event));

}