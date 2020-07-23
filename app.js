let correctClicks = 0;
let count = 30;
let currentBox;
let isThisActive = false;
let cancelled = false;
let activeBox = document.querySelector(`.box${currentBox}`);
let highscore = 0;
let box1;
let box2;

const wrapper = document.querySelector('.wrapper');
const boxGrid = document.querySelector('.box-grid');
const seconds = document.querySelector('.seconds');
const completeResults = document.querySelector('.complete-results');
const completeResultsh1 = document.querySelector('#complete-results-h1');
const completeResultsp = document.querySelector('#complete-results-p');
const failedResults = document.querySelector('.failed-results');
const failedResultsh1 = document.querySelector('#failed-results-h1');
const failedResultsp = document.querySelector('#failed-results-p');
const redoButton = document.querySelector('.redo-button');
const timerText = document.querySelector('.timer-text');
const startHelp = document.querySelector('.start-help');
const score = document.querySelector('.score');

//this creates 16 boxes to be clicked
function createBox() {
	const box = document.createElement('div');
	box.classList.add(`box`);
	box.classList.add(`box${i}`);
	box.classList.add('inactive');
	boxGrid.appendChild(box);
}

let i = 1;
while (i < 17) {
	createBox();
	i++;
}

//these functions select 2 random boxes to become active
function randomBox1() {
	box1 = Math.floor(Math.random() * 17);

	if (box1 === 0 || box1 === box2) {
		randomBox1();
	}

	activeBox1 = document.querySelector(`.box${box1}`);
	activeBox1.classList.remove('inactive');
	activeBox1.classList.add('active');
}

function randomBox2() {
	box2 = Math.floor(Math.random() * 17);

	if (box2 === 0 || box2 === box1) {
		randomBox2();
	}

	activeBox2 = document.querySelector(`.box${box2}`);
	activeBox2.classList.remove('inactive');
	activeBox2.classList.add('active');
}
randomBox1();
randomBox2();

// 30 second timer starting on the first click
function countdown(e) {
	if (!isThisActive) {
		isThisActive = true;

		if (cancelled) {
			cancelled = false;
		}

		timerText.innerText = 'Seconds left';
		startHelp.classList.add('fade-out');

		function tick() {
			if (cancelled) {
				return;
			} else {
				count--;
				seconds.innerText = (count < 10 ? '0' : '') + String(count);

				if (count > 0) {
					setTimeout(tick, 1000);
				}

				if (count === 0) {
					isThisActive = false;
					seconds.innerText = '0';
					timerText.innerText = 'Times up!';
					countdownFinished();
					return;
				}
			}
		}
		tick();
	}
}

// this is defined here as another function above creates the boxes, so would be undefined if placed at the top
const allBoxes = document.querySelectorAll('.box');

function gameOver() {
	allBoxes.forEach((x) => {
		x.classList.add('cancelled');
	});

	timerText.innerText = 'Seconds were left';

	isThisActive = false;
	failedResults.classList.add('fade-in');

	failedResultsh1.innerText = `Awwww Damn!`;
	failedResultsp.innerText = `You managed to get a total of ${correctClicks} correct clicks within before you misclicked! Why don't you try again?`;

	if (highscore === 0) {
		highscore = correctClicks;
		score.innerText = highscore;
	} else if (correctClicks > highscore) {
		highscore = correctClicks;
		score.innerText = highscore;
	}
}

function countdownFinished() {
	allBoxes.forEach((x) => {
		x.classList.add('countdown-finished');
	});

	completeResults.classList.add('fade-in');

	completeResultsh1.innerText = `Good Job!`;
	completeResultsp.innerText = `You managed to get a total of ${correctClicks} correct clicks within 30 seconds!`;

	if (highscore === 0 || correctClicks > highscore) {
		highscore = correctClicks;
		score.innerText = highscore;
	}
}

function reset() {
	correctClicks = 0;
	cancelled = true;
	isThisActive = false;

	allBoxes.forEach((x) => {
		x.classList.remove('cancelled');
	});

	allBoxes.forEach((x) => {
		x.classList.remove('countdown-finished');
	});

	failedResults.classList.remove('fade-in');
	completeResults.classList.remove('fade-in');
	startHelp.classList.remove('fade-out');

	activeBox1.classList.add('inactive');
	activeBox1.classList.remove('active');
	randomBox1();
	activeBox2.classList.add('inactive');
	activeBox2.classList.remove('active');
	randomBox2();

	count = 30;
	seconds.innerText = count;

	completeResultsh1.innerText = '';
	completeResultsp.innerText = '';
	failedResultsh1.innerText = '';
	failedResultsp.innerText = '';

	timerText.innerText = 'Second timer';
}

//event listeners

boxGrid.addEventListener('click', (e) => {
	if (e.target.classList.contains('active' && `box${box1}`)) {
		activeBox1.classList.remove('active');
		activeBox1.classList.add('inactive');
		correctClicks++;
		countdown();
		randomBox1();
	} else if (e.target.classList.contains('active' && `box${box2}`)) {
		activeBox2.classList.remove('active');
		activeBox2.classList.add('inactive');
		correctClicks++;
		countdown();
		randomBox2();
	} else if (e.target.classList.contains('inactive')) {
		gameOver();
		cancelled = true;
	}
});

redoButton.addEventListener('click', () => {
	reset();
});
