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
} from "./config"

let shuttle = null;

let score = 0;
let life = 3;

let enemyMoveSpeed = 200;
let enemySpawnSpeed = 1000;

let respawnIntervall;
let enemiesIntervall;

let stopExecution = false;

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
            setEnemyIntervall();
            enemyMoveSpeed = enemyMoveSpeed - 2;
            enemySpawnSpeed = enemySpawnSpeed - 15;

        }

    }, 2000);

}

// Intervall of the enemies. This intervall spawns enemies at every interation.
const setEnemyIntervall = () => {

    enemiesIntervall = setInterval(() => {

        if (stopExecution) clearInterval(enemiesIntervall)
        else {

            // Every time a enemy is spawned set the intervall for moving it.
            const enemy = new Enemy();

            const moveIntervall = setInterval(() => {

                if (stopExecution) {

                    clearInterval(enemiesIntervall)
                    clearInterval(moveIntervall)

                } else {

                    // if the enemy is not destroyed or not have a collision with the shuttle, the enemy is moved on the next cell
                    // else update score or life and stop the intervall of the enemy
                    if (enemy.x[0] >= 1 && !enemy.destroyed && !enemy.collision) enemy.moveEnemies()
                    else {

                        if (enemy.destroyed) updateScore()
                        if (enemy.collision) updateLife()
                        clearInterval(moveIntervall)

                    }

                }

            }, enemyMoveSpeed);

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
    if (life == 0) {

        stopExecution = true;
        $('#' + END_GAME_MODAL).modal("show");
        document.getElementById(TOTAL_SCORE_ID).innerText = score;

    }

}



// Keyboard event
const checkKey = ({keyCode}) => {

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

// Restart the game after the end
const restartGame = () => {

    // Reset the variables value
    stopExecution = false;

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

    createSpace();

    // Start the enemies spwaning
    startEnemies();

}

window.onload = function () {

    new PageCreator()

    // Instatiation of a the Shuttle
    shuttle = new Shuttle();

    document.getElementById(START_GAME_BUTTON_ID).addEventListener("click", () => {

        document.getElementById(START_GAME_BUTTON_ID).disabled = true;
        createSpace();

        // Start the enemies spwaning
        startEnemies();

    });

    document.getElementById(NEW_GAME_BUTTON_ID).addEventListener("click", () => {

        // restart the game
        restartGame();

    });

    // key event listener
    document.addEventListener("keydown", event => checkKey(event));

}