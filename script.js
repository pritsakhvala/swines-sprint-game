"use strict";

//selecting the element
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currnet0El = document.getElementById("current--0");
const currnet1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//staring condition
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  currnet0El.textContent = 0;
  currnet1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); // it check if 0El is active then active 1El
  player1El.classList.toggle("player--active");
};

//Rolling dice functinality
btnRoll.addEventListener("click", function () {
  //1.generate a random dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3.if dice==1 then switch player to next player
    if (dice !== 1) {
      //add score to current scoer
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  //1.add current score to active player
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if current player score>=100 then finish
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`#name--${activePlayer}`).textContent =
        "🥇winner!";
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
