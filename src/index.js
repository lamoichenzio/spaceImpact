import { Shuttle, Fire } from "./shuttle";
import Enemy from "./enemies";

var row = 30
var column = 100

var shuttle;

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

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        shuttle.moveUp();
    } else if (e.keyCode == '40') {
        shuttle.moveDown();

    } else if (e.keyCode == '32') {
        let fire = new Fire(shuttle);

        var intervall = setInterval(function() {
            if (fire.x <= 101) {
                fire.moveFire();
            } else {
                clearInterval(intervall)
            }
        }, 10);
    } else if (e.keyCode == '39') {
        console.log("here 39")
        var enemy = new Enemy();
        enemy.createEnemies();

    }

}

window.onload = function() {

    shuttle = new Shuttle();
    document.getElementById("startGame").addEventListener("click", () => {
        shuttle.createShuttle();
    });


    document.getElementById("createButton").addEventListener("click", createWorld);

    document.addEventListener("keydown", (e) => checkKey(e));


}