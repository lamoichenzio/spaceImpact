import {
    EMPTY_CELL_TITLE,
    EMPTY_CELL_CLASS,
    SHUTTLE_TITLE,
    ENEMY_TITLE,
    ENEMY_CLASS,
    ENEMY_DESTROYED_TITLE
} from "./config"
import { setClassAndTitle } from "./utility";

class Enemy {

    constructor() {

        // Range of values for row indexes
        const y_min = 2
        const y_max = 23

        // Get a randomVaue form the y indexes range
        const y_r = Math.floor(Math.random() * (y_max - y_min + 1)) + y_min;

        // The enemy start always formthe last column
        this.x = [60, 60];
        this.y = [y_r, y_r + 1];
        setClassAndTitle(this, ENEMY_CLASS, ENEMY_TITLE);

        // Used in case of enemy destroyed by fire
        this.destroyed = false;

        // Used in case of collision with the shuttle
        this.collision = false;

        this.createEnemy();

    }

    // Creates enemy in the space
    createEnemy() {

        for (let i = 0; i < 2; i++) {

            const cell = document.getElementById(this.y[i] + "-" + this.x[i]);
            setClassAndTitle(cell, this.className, this.title);

        }

    }

    // Moves the enemy to ne next cell
    moveEnemies() {

        const cellUP = document.getElementById(this.y[0] + "-" + this.x[0]);
        const cellDOWN = document.getElementById(this.y[1] + "-" + this.x[1]);

        // Case if the enemy is on the left border of the space
        if (this.x[0] === 1) {

            // Sets both cells to an empty cell
            setClassAndTitle(cellDOWN, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE);
            setClassAndTitle(cellUP, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE);

        } else {

            // if an enemy is destroyed set destroyed to true
            if (cellUP.title === ENEMY_DESTROYED_TITLE || cellDOWN.title === ENEMY_DESTROYED_TITLE) {

                setClassAndTitle(cellDOWN, null, EMPTY_CELL_TITLE);
                setClassAndTitle(cellUP, null, EMPTY_CELL_TITLE);

                this.destroyed = true;

            } else {

                // move the enemy to the next cells
                setClassAndTitle(cellUP, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE);
                setClassAndTitle(cellDOWN, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE);

                this.x[0] = this.x[0] - 1;
                this.x[1] = this.x[1] - 1;

                const newCellUP = document.getElementById(this.y[0] + "-" + this.x[0]);
                const newCellDOWN = document.getElementById(this.y[1] + "-" + this.x[1]);

                // if in the new position there is the shuttle set collion to true
                if (newCellUP.title === SHUTTLE_TITLE || newCellDOWN.title === SHUTTLE_TITLE) {

                    this.collision = true;

                } else {

                    setClassAndTitle(newCellUP, this.className, this.title);
                    setClassAndTitle(newCellDOWN, this.className, this.title);

                }

            }

        }

    }

}

export default Enemy;