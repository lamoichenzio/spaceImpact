class Enemy {
    constructor() {
        this.color = "#000";
        var y_r = getRandomIntInclusive(1, 29);

        this.x = [100, 100];
        this.y = [y_r, y_r + 1];
        this.id = "enemy";
        this.className = "enemy";
        this.title = "enemy";

    }

    get() {
        return this;
    }

    createEnemies() {
        console.log("here");
        let positions = [];
        for (let i = 0; i <= 1; i++) {
            positions.push(this.y[i] + "-" + this.x[i]);
        }
        var toPlace = true;

        for (let position of positions) {
            var cell = document.getElementById(position);
            if (cell.title == this.title) {
                toPlace = false;
                console.log("impossible to place here!")
                break;
            }
        }


        if (toPlace) {
            for (let position of positions) {
                console.log(position);
                var cell = document.getElementById(position);
                cell.className = this.className;
                cell.title = this.title;
            }
        }
    }
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso 
}

export default Enemy;