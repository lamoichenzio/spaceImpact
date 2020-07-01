import { setClassAndTitle } from "./utility";
import {
    EMPTY_CELL_TITLE,
    EMPTY_CELL_CLASS,
    SHUTTLE_TITLE,
    SHUTTLE_CLASS
} from "./config"


class Shuttle {

    constructor() {

        // The x and y arrays contain the indexes, respectively, on columns and on rows
        this.x = [2, 2, 2, 3];
        this.y = [12, 13, 14, 13];
        setClassAndTitle(this, SHUTTLE_CLASS, SHUTTLE_TITLE);

    }

    // Creates the shuttle in the initial position
    createShuttle() {

        for (let i = 0; i <= 3; i++) {

            const cell = document.getElementById(this.y[i] + "-" + this.x[i]);
            setClassAndTitle(cell, this.className, this.title);

        }

    }

    // Move up the shuttle
    moveUp() {

        // Check if is possible move up
        if (this.y[0] > 2) {

            for (let i = 0; i <= 3; i++) {

                // set the old cell to empty cell
                const oldCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                setClassAndTitle(oldCell, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE);

                // set the new cell to shuttle cell
                this.y[i] -= 2;
                const newCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                setClassAndTitle(newCell, this.className, this.title);

            }

        }

    }

    moveDown() {

        // Check if is possible move down
        if (this.y[2] < 23) {

            for (let i = 3; i >= 0; i--) {

                // set the old cell to empty cell
                const oldCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                setClassAndTitle(oldCell, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE)

                // set the new cell to shuttle cell
                this.y[i] += 2;
                const newCell = document.getElementById(this.y[i] + "-" + this.x[i]);
                setClassAndTitle(newCell, this.className, this.title);

            }

        }

    }

}

export default Shuttle