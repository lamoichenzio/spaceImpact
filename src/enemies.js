class Enemy {
    constructor() {

        var y_min = 2
        var y_max = 23

        var y_r = Math.floor(Math.random() * (y_max - y_min + 1)) + y_min;

        this.x = [60, 60];
        this.y = [y_r, y_r + 1];
        this.id = "enemy";
        this.className = "enemy";
        this.title = "enemy";
        this.destroyed = false;
        this.collision = false;
    }

    createEnemies() {

        let positions = [];

        for (let i = 0; i < 2; i++) {
            positions.push(this.y[i] + "-" + this.x[i]);
        }

        for (let position of positions) {
            var cell = document.getElementById(position);
            cell.className = this.className;
            cell.title = this.title;
        }
    }

    moveEnemies() {

        let cellUP = document.getElementById(this.y[0] + "-" + this.x[0]);
        let cellDOWN = document.getElementById(this.y[1] + "-" + this.x[1]);

        if (this.x[0] == 1) {

            cellDOWN.title = "cell";
            cellDOWN.className = "cell";
            cellUP.title = "cell";
            cellUP.className = "cell";

        } else {

            if (cellUP.title == "cell" || cellDOWN.title == "cell") {

                if (cellDOWN.title != "cell") {
                    cellDOWN.title = "cell";
                    cellDOWN.className = "cell";
                }

                if (cellUP.title != "cell") {
                    cellUP.title = "cell";
                    cellUP.className = "cell";
                }

                this.destroyed = true;

            } else {

                cellUP.title = "cell";
                cellUP.className = "cell";
                cellDOWN.title = "cell";
                cellDOWN.className = "cell";

                this.x[0] = this.x[0] - 1;
                this.x[1] = this.x[1] - 1;

                let newCellUP = document.getElementById(this.y[0] + "-" + this.x[0]);
                let newCellDOWN = document.getElementById(this.y[1] + "-" + this.x[1]);

                if (newCellUP.title == "shuttle" || newCellDOWN.title == "shuttle") {

                    this.collision = true;

                } else {

                    newCellUP.className = this.className;
                    newCellUP.title = this.title;

                    newCellDOWN.className = this.className;
                    newCellDOWN.title = this.title;
                }
            }

        }
    }
}

export default Enemy;