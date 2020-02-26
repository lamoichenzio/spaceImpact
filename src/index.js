import { Shuttle, Fire } from "./shuttle";
import Enemy from "./enemies";

var row = 25
var column = 60
var score = 0;
var life = 3;

var shuttle;

var enemyMoveSpeed = 200;
var enemySpawnSpeed = 1000;

var respawnIntervall;
var enemiesIntervall;

var stopExecution = false;

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

function initializeGame() {

    setTimeout(function() { startGame(); }, 3000);
}


function startGame() {

    setEnemyIntervall();

    setTimeout(function() {
        clearInterval(enemiesIntervall)
    }, 10000);

    respawnIntervall = setInterval(function() {

        if (stopExecution) {
            clearInterval(respawnIntervall);
            enemyMoveSpeed = 200;
            enemySpawnSpeed = 1000;
        } else {
            clearInterval(enemiesIntervall)
            setEnemyIntervall();
            enemyMoveSpeed = enemyMoveSpeed - 4;
            console.log("Updating move speed" + enemyMoveSpeed);
            enemySpawnSpeed = enemySpawnSpeed - 20;
            console.log("Updating Spawn speed" + enemyMoveSpeed);
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

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        shuttle.moveUp();
    } else if (e.keyCode == '40') {
        shuttle.moveDown();

    } else if (e.keyCode == '32') {
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
                    if (enemy.x[0] >= 1 && !enemy.destroyed && !enemy.collision) {
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

window.onload = function() {

    // setTimeout(function() {
    //     $('#mymodal').modal("show");
    // }, 500);

    shuttle = new Shuttle();
    document.getElementById("startGame").addEventListener("click", () => {

        document.getElementById("startGame").disabled = true;
        createWorld();
        shuttle.createShuttle();
        initializeGame();
    });
    document.addEventListener("keydown", (e) => checkKey(e));


}