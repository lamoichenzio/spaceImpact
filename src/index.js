import { Shuttle, Fire } from "./shuttle";
import Enemy from "./enemies";

let row = 25
let column = 60

let shuttle;

let score = 0;
let life = 3;

let enemyMoveSpeed = 200;
let enemySpawnSpeed = 1000;

let respawnIntervall;
let enemiesIntervall;

let stopExecution = false;
let justInitialized = false;

// Creates the space
let createWorld = function() {
    var table = document.getElementById("world");
    for (var i = 1; i <= row; i++) {
        var tr = document.createElement("tr");
        for (var e = 1; e <= column; e++) {
            var td = document.createElement("td");
            td.id = i + "-" + e;
            td.title = "cell"
            td.className = "cell";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

// Start the game with a delay of 3 seconds
function initializeGame() {
    setTimeout(function() { startGame(); }, 3000);
}

// Start the game 
function startGame() {

    justInitialized = false;

    // Start the basic intervall
    setEnemyIntervall();

    // After 10 seconds reset the new intervall
    setTimeout(function() {
        clearInterval(enemiesIntervall)
    }, 10000);

    // Change speed of spawn and moves
    respawnIntervall = setInterval(function() {
        if (stopExecution) {
            clearInterval(respawnIntervall);
            enemyMoveSpeed = 200;
            enemySpawnSpeed = 1000;
        } else {
            clearInterval(enemiesIntervall)
            setEnemyIntervall();
            enemyMoveSpeed = enemyMoveSpeed - 2;
            enemySpawnSpeed = enemySpawnSpeed - 20;
        }
    }, 2000);
}

function updateScore() {
    score += 100;
    console.log(score);
    document.getElementById("score").innerText = score;
}


function updateLife() {
    life--;
    console.log(life);
    document.getElementById("life").innerText = life;

    if (life == 0) {
        console.log("END GAME");
        stopExecution = true;
        $('#mymodal').modal("show");
        document.getElementById("totalScore").innerText = score;
    }
}

// Intervall of the enemies
// Check also collision and remove remaining pieces
function setEnemyIntervall() {
    enemiesIntervall = setInterval(function() {
        if (stopExecution) {
            clearInterval(enemiesIntervall);
        } else {
            var enemy = new Enemy();
            enemy.createEnemies();
            var moveIntervall = setInterval(function() {
                if (stopExecution) {
                    clearInterval(enemiesIntervall);
                } else {
                    if (enemy.x[0] >= 1 && !enemy.destroyed && !enemy.collision && !justInitialized) {
                        enemy.moveEnemies();
                    } else {
                        console.log(enemy.destroyed);
                        if (enemy.destroyed) {
                            updateScore();
                        };
                        if (enemy.collision) {
                            updateLife();
                        }
                        clearInterval(moveIntervall)
                    }
                }
            }, enemyMoveSpeed);
        }
    }, enemySpawnSpeed);
}

// Keyboard event
function checkKey(e) {
    e = e || window.event;

    // UpArrow Key
    if (e.keyCode == '38') {
        shuttle.moveUp();

        // DownArrow Key
    } else if (e.keyCode == '40') {
        shuttle.moveDown();

        // Space Key
    } else if (e.keyCode == '32') {

        // Instantiates a new fire
        let fire = new Fire(shuttle);
        var fireIntervall = setInterval(function() {
            if (fire.x <= 61) {
                fire.moveFire();
            } else {
                clearInterval(fireIntervall)
            }
        }, 10);

    }

}

// Restart the game after end
// Reset the variables values.
function restartGame() {

    enemyMoveSpeed = 200;
    enemySpawnSpeed = 1000;

    score = -100;
    life = 4;

    updateScore();
    updateLife();

    respawnIntervall = null;
    enemiesIntervall = null;

    stopExecution = false;
    justInitialized = true;

    $('#mymodal').modal("hide");

    var table = document.getElementById("world");
    var child = table.lastElementChild;
    while (child) {
        table.removeChild(child);
        child = table.lastElementChild;
    }

    shuttle = new Shuttle();
    createWorld();
    shuttle.createShuttle();
    initializeGame();

}

window.onload = function() {

    // instantiate a new Shuttle
    shuttle = new Shuttle();

    document.getElementById("startGame").addEventListener("click", () => {
        document.getElementById("startGame").disabled = true;
        createWorld();
        shuttle.createShuttle();
        initializeGame();
    });

    document.getElementById("restartGame").addEventListener("click", () => {
        restartGame();
    });

    document.addEventListener("keydown", (e) => checkKey(e));
}