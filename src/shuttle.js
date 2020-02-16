class Shuttle {
    constructor() {
        this.color = "#000";
        this.x = [2, 2, 2, 3];
        this.y = [14, 15, 16, 15];
        this.id = "shuttle";
        this.className = "shuttle";
        this.title = "shuttle";
    }

    get() {
        return this;
    }

    createShuttle() {
        let positions = [];
        for (let i = 0; i <= 3; i++) {
            positions.push(this.y[i] + "-" + this.x[i]);
        }
        for (let position of positions) {
            var cell = document.getElementById(position);
            cell.className = this.className;
            cell.title = this.title;
        }
    }

    moveUp() {

        if (this.y[0] > 2) {

            let oldPositions = [];
            let newPosition = [];
            for (let i = 0; i <= 3; i++) {
                oldPositions.push(this.y[i] + "-" + this.x[i]);
                this.y[i] -= 2;
                newPosition.push(this.y[i] + "-" + this.x[i]);
            }

            for (let position of oldPositions) {
                let cell = document.getElementById(position);
                cell.className = "cell";
                cell.title = "cell";
            }

            for (let position of newPosition) {
                let cell = document.getElementById(position);
                cell.className = this.className;
                cell.title = this.title;
            }
        }
    }

    moveDown() {
        if (this.y[2] < 29) {

            let oldPositions = [];
            let newPosition = [];
            for (let i = 0; i <= 3; i++) {
                oldPositions.push(this.y[i] + "-" + this.x[i]);
                this.y[i] += 2
                newPosition.push(this.y[i] + "-" + this.x[i]);
            }

            for (let position of oldPositions) {
                let cell = document.getElementById(position);
                cell.className = "cell";
                cell.id = position;
            }
            for (let position of newPosition) {
                let cell = document.getElementById(position);
                cell.className = this.className;
                // cell.id = this.id;
            }
        }
    }

}

class Fire {
    constructor(shuttle) {
        let nave = shuttle.get();
        this.x = nave.x[3] + 1;
        this.y = nave.y[1];
        this.className = "fire";
        this.title = "fire";
    }

    get() {
        return this;
    }

    moveFire() {


        if (this.x != 101) {

            var cell = document.getElementById(this.y + "-" + (this.x - 1));

            if (cell.title != "shuttle") {
                cell.className = "cell";
                cell.title = "cell";
            }

            var cell = document.getElementById(this.y + "-" + this.x);

            cell.className = this.className;
            cell.title = this.title;

            this.x += 1;
        } else {

            var cell = document.getElementById(this.y + "-" + (this.x - 1));
            cell.className = "cell";
            cell.title = "cell";
            this.x += 1;


        }


    }


}

export { Shuttle, Fire };