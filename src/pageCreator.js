import {
	END_GAME_MODAL,
	COUNTDOWN_MODAL,
	RESTART_MODAL,
	WORLD_ID,
	SCORE_ID,
	LIFE_ID,
	TOTAL_SCORE_ID,
	START_GAME_BUTTON_ID,
	RESTART_GAME_BUTTON_ID,
	RESTART_BUTTON_ID,
	PLAY_PAUSE_GAME_BUTTON_ID,
	NEW_GAME_BUTTON_ID,
	CONTINUE_BUTTON_ID,
	COUNTDOWN_TIMER
} from "./config"

class PageCreator {

	constructor() {
		this.createPage();
	}

	createPage() {

		document.body = document.createElement("body");
		document.body.className = "container";

		const header = '<div class="row justify-content-center align-items-center my-4">' +
			'<div class="col-auto">' +
			'<h1>Space Impact</h1>' +
			'</div></div>'

		const buttons = '<div class="row justify-content-center align-items-center my-4">' +
			'<div class="col-auto">' +
			'<button id="' + START_GAME_BUTTON_ID + '" class="btn btn-primary">Start Game</button>' +
			'</div>' +
			'<div class="col-auto">' +
			'<button id="' + PLAY_PAUSE_GAME_BUTTON_ID + '" class="btn btn-primary" disabled>Pause</button>' +
			'</div>' +
			'<div class="col-auto">' +
			'<button id="' + RESTART_GAME_BUTTON_ID + '" class="btn btn-primary" disabled>Restart Game</button>' +
			'</div>' +
			'</div>'


		const gameInfo = '<div class="row justify-content my-4">' +
			'<div class="col-12">' +
			'<h5>SCORES: <span id="' + SCORE_ID + '">0</span> </h5>' +
			'</div>' +
			'<div class="col-12">' +
			'<h5>LIFES: <span id="' + LIFE_ID + '">3</span></h5>' +
			'</div>' +
			'</div >'


		const spaceContainer = '<div class="row justify-content-center align-items-center my-4">' +
			'<div class="col-auto">' +
			'<table id="' + WORLD_ID + '"> </table>' +
			'</div>' +
			'</div >'


		const modalEndGame = '<div id="' + END_GAME_MODAL + '" class="modal fade bd-example-modal-xl" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">' +
			'<div class="modal-dialog modal-dialog-centered modal-xl" role="document">' +
			'<div class="modal-content">' +
			'<div class="modal-body">' +
			'<div class="row justify-content-center align-items-center my-5">' +
			'<h1 class="display-4">End Game</h1>' +
			'</div>' +
			'<div class="row justify-content-center align-items-center my-5">' +
			'<div class="col-auto">' +
			'<h1>TOTAL SCORE:</h1>' +
			'</div>' +
			'<div class="col-auto">' +
			'<h1 id="' + TOTAL_SCORE_ID + '">0</h1>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="modal-footer justify-content-center align-items-center">' +
			'<button id="' + NEW_GAME_BUTTON_ID + '" class="btn btn-primary my-5">New Game</button>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'

		const modalCountdown = '<div id="' + COUNTDOWN_MODAL + '" class="modal fade bd-example-modal-xl" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel"  aria-hidden="true">' +
			'<div class="modal-dialog modal-dialog-centered modal-sm" role="document">' +
			'<div class="modal-content">' +
			'<div class="modal-body">' +
			'<div class="row justify-content-center align-items-center my-5">' +
			'<div class="col-auto">' +
			'<h1 id="' + COUNTDOWN_TIMER + '"></h1>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'

		const modalReset = '<div id="' + RESTART_MODAL + '" class="modal fade bd-example-modal-xl" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">' +
			'<div class="modal-dialog modal-dialog-centered modal-xl" role="document">' +
			'<div class="modal-content">' +
			'<div class="modal-body">' +
			'<div class="row justify-content-center align-items-center my-5">' +
			'<h1>Do you want to restart the game?</h1>' +
			'</div>' +
			'</div>' +
			'<div class="modal-footer justify-content-center align-items-center">' +
			'<button id="' + CONTINUE_BUTTON_ID + '" class="btn btn-primary my-5">Continue</button>' +
			'<button id="' + RESTART_BUTTON_ID + '" class="btn btn-primary my-5">Restart Game</button>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'

		document.body.innerHTML = header + buttons + gameInfo + spaceContainer + modalEndGame + modalCountdown + modalReset

	}

}

export default PageCreator;