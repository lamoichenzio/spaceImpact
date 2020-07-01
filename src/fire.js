import { setClassAndTitle } from "./utility";
import {
	EMPTY_CELL_TITLE,
	EMPTY_CELL_CLASS,
	SHUTTLE_TITLE,
	FIRE_TITLE,
	FIRE_CLASS,
	ENEMY_TITLE,
	ENEMY_DESTROYED_TITLE
} from "./config"


class Fire {

	constructor(shuttle) {

		// Use the shuttle position to set the fire starting position
		this.x = shuttle.x[3] + 1;
		this.y = shuttle.y[3];
		setClassAndTitle(this, FIRE_CLASS, FIRE_TITLE);

	}

	// Set the interval for the fire movement
	moveFire() {

		const fireIntervall = setInterval(() => {

			if (!this.fireMovementLoop()) {

				clearInterval(fireIntervall)
				console.log(this.x)

			}

		}, 10);

	}

	// Moves the fire and returns a boolean (true: if the fire can be moved to the next cell; false: otherwise)
	fireMovementLoop() {

		// Cell at the column 61 is out of the table and is the end index of the fire
		if (this.x != 61) {

			const previousCell = document.getElementById(this.y + "-" + (this.x - 1));

			// Check if the previous cell is not a shuttle and then set the cell as an empty cell
			if (previousCell.title != SHUTTLE_TITLE) {

				setClassAndTitle(previousCell, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE);

			}

			const currentCell = document.getElementById(this.y + "-" + this.x);
			// Check if the current cell is an enemy cell
			if (currentCell.title == ENEMY_TITLE) {

				setClassAndTitle(currentCell, EMPTY_CELL_CLASS, ENEMY_DESTROYED_TITLE);

				// Check if is the cell below or the cell above and remove enemy
				// Checking cell below
				const cell_below = document.getElementById(this.y + 1 + "-" + this.x);
				if (cell_below != undefined && cell_below.title == ENEMY_TITLE) {

					setClassAndTitle(cell_below, EMPTY_CELL_CLASS, ENEMY_DESTROYED_TITLE);

				} else {

					// Checking cell above
					const cell_above = document.getElementById(this.y - 1 + "-" + this.x);
					if (cell_above != undefined && cell_above.title == ENEMY_TITLE) {

						setClassAndTitle(cell_above, EMPTY_CELL_CLASS, ENEMY_DESTROYED_TITLE)
					
					}

				}

			} else {

				// set the current cell to a fire cell
				setClassAndTitle(currentCell, this.className, this.title);
				this.x += 1;

				// fire can be moved to the next cell
				return true

			}

		} else {

			// Set the cell to an empty cell
			const cell = document.getElementById(this.y + "-" + (this.x - 1));

			setClassAndTitle(cell, EMPTY_CELL_CLASS, EMPTY_CELL_TITLE)
			this.x += 1;

		}

		// fire can be moved to the next cell
		return false

	}

}

export default Fire