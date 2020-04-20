import {
    EMPTY_CELL_TITLE,
    EMPTY_CELL_CLASS,
    SHUTTLE_TITLE,
    SHUTTLE_CLASS,
    FIRE_TITLE,
    FIRE_CLASS,
    ENEMY_TITLE,
    ENEMY_DESTROYED_TITLE
} from "./config"

class Shuttle {

    constructor() {

        // The x and y arrays contain the indexes, respectively, on columns and on rows
        this.x = [2, 2, 2, 3];
        this.y = [12, 13, 14, 13];
        this.className = SHUTTLE_CLASS;
        this.title = SHUTTLE_TITLE;

    }

    // Creates the shuttle in the initial position
    createShuttle() {

        for (let i = 0; i <= 3; i++) {

            let cell = document.getElementById(this.y[i] + "-" + this.x[i]);
            cell.className = this.className;
            cell.title = this.title;

        }

    }

    // Move up the shuttle
    moveUp() {

        // Check if is possible move up
        if (this.y[0] > 2) {

            for (let i = 0; i <= 3; i++) {

                // set the old cell to empty cell
                let oldCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                oldCell.className = EMPTY_CELL_CLASS;
                oldCell.title = EMPTY_CELL_TITLE;

                // set the new cell to shuttle cell
                this.y[i] -= 2;
                let newCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                newCell.className = this.className;
                newCell.title = this.title;

            }

        }

    }

    moveDown() {

        // Check if is possible move down
        if (this.y[2] < 23) {

            for (let i = 3; i >= 0; i--) {

                // set the old cell to empty cell
                let oldCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                oldCell.className = EMPTY_CELL_CLASS;
                oldCell.title = EMPTY_CELL_TITLE;

                // set the new cell to shuttle cell
                this.y[i] += 2;
                let newCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                newCell.className = this.className;
                newCell.title = this.title;

            }

        }

    }

}

class Fire {

    constructor(shuttle) {

        // Use the shuttle position to set the fire starting position
        this.x = shuttle.x[3] + 1;
        this.y = shuttle.y[3];
        this.className = FIRE_CLASS;
        this.title = FIRE_TITLE;

    }

    // Set the interval for the fire movement
    moveFire() {

        let self = this
        let fireIntervall = setInterval(function () {

            if (!self.fireMovementLoop()) {

                clearInterval(fireIntervall)
                console.log(self.x)

            }

        }, 10);

    }

    // Moves the fire and returns a boolean (true: if the fire can be moved to the next cell; false: otherwise)
    fireMovementLoop() {

        // Cell at the column 61 is out of the table and is the end index of the fire
        if (this.x != 61) {

            let previousCell = document.getElementById(this.y + "-" + (this.x - 1));

            // Check if the previous cell is not a shuttle and then set the cell as an empty cell
            if (previousCell.title != SHUTTLE_TITLE) {

                previousCell.className = EMPTY_CELL_CLASS;
                previousCell.title = EMPTY_CELL_TITLE;

            }

            let currentCell = document.getElementById(this.y + "-" + this.x);

            // Check if the current cell is an enemy cell
            if (currentCell.title == ENEMY_TITLE) {

                currentCell.className = EMPTY_CELL_CLASS;
                currentCell.title = ENEMY_DESTROYED_TITLE;

                // Check if is the cell below or the cell above and remove enemy
                // Checking cell below

                let cell_below = document.getElementById(this.y + 1 + "-" + this.x);
                if (cell_below != undefined && cell_below.title == ENEMY_TITLE) {

                    cell_below.className = EMPTY_CELL_CLASS;
                    cell_below.title = ENEMY_DESTROYED_TITLE;

                } else {

                    // Checking cell above
                    let cell_above = document.getElementById(this.y - 1 + "-" + this.x);
                    if (cell_above != undefined && cell_above.title == ENEMY_TITLE) {

                        cell_above.className = EMPTY_CELL_CLASS;
                        cell_above.title = ENEMY_DESTROYED_TITLE;

                    }

                }

            } else {

                // set the current cell to a fire cell
                currentCell.className = this.className;
                currentCell.title = this.title;
                this.x += 1;

                // fire can be moved to the next cell
                return true

            }

        } else {

            // Set the cell to an empty cell
            let cell = document.getElementById(this.y + "-" + (this.x - 1));
            cell.className = EMPTY_CELL_CLASS;
            cell.title = EMPTY_CELL_TITLE;
            this.x += 1;

        }

        // fire can be moved to the next cell
        return false

    }

}

export { Shuttle, Fire };