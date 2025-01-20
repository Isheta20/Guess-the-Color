window.onload = function () {
  //let's goooo
  startGame();

  //scoreboard
  if (!localStorage.getItem("wins")) {
    localStorage.setItem("wins", "0");
  }
  if (!localStorage.getItem("losses")) {
    localStorage.setItem("losses", "0");
  }
  document.querySelector(".wins").innerHTML =
    window.localStorage.getItem("wins");
  document.querySelector(".losses").innerHTML =
    window.localStorage.getItem("losses");

  //winhistory
  if (!localStorage.getItem("winHistory")) {
    localStorage.setItem("winHistory", "");
  }
  if (!localStorage.getItem("livesUsedWhenWon")) {
    localStorage.setItem("livesUsedWhenWon", "");
  }

  //lives
  document.querySelector(".livesnum").innerHTML = 10 - guesses;

  // move to next and backspace for input
  moveNext();
};

let rColor;
function startGame() {
  rColor = randomColor();
  let x = "#" + rColor;
  document.querySelector(".what").style.backgroundColor = x;
}

function randomColor() {
  hex = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 16);
    color += hex[random];
  }
  return color;
}

function moveNext() {
  let inputs = document.querySelectorAll("input[type = 'text']");
  inputs.forEach((item, index, inputs) => {
    // Move to next input if one character is entered
    item.addEventListener("input", () => {
      if (item.value.length === 1 && inputs[index + 1]) {
        inputs[index + 1].focus();
      }
    });

    //move to previous input on backspace if curr input is empty
    item.addEventListener("keydown", (e) => {
      if (
        e.key === "Backspace" &&
        item.value.length === 0 &&
        inputs[index - 1]
      ) {
        inputs[index - 1].focus();
      }

      if (e.key === "ArrowLeft" && inputs[index - 1]) {
        inputs[index - 1].focus();
      }
      if (e.key === "ArrowRight" && inputs[index + 1]) {
        inputs[index + 1].focus();
      }
    });
  });
}

let guessedCombos = [];
const form = document.querySelector("form");
let guesses = 0;
let colorsWon = [];
let livesUsedWhenWon = [];

function submitHandler(e) {
  e.preventDefault();
  let inputs = document.querySelectorAll('input[type="text"]');

  guesses += 1;
  ChkColor(inputs);
  ChkGuess();
}
form.addEventListener("submit", submitHandler);

function ChkGuess() {
  if (guesses == 9) endGame(false);
}

function ChkColor(inputs) {
  let para = document.querySelectorAll(
    'p[id="0"], p[id="1"], p[id="2"], p[id="3"], p[id="4"], p[id="5"]'
  );

  let i = 0;
  let currGuess = "";
  inputs.forEach((element) => {
    // console.log("rColor[i]:", rColor[i], typeof rColor[i]);
    // console.log("element.value:", element.value, typeof element.value);

    let val = element.value.toUpperCase();
    currGuess = currGuess + val;

    if (rColor[i] === val) {
      para[i].innerHTML = "✔️";
    } else if (rColor[i] < val) {
      para[i].innerHTML = "Guessed High";
    } else {
      para[i].innerHTML = "Guessed Low";
    }
    i++;
  });

  rightSection(currGuess);
  winOrNot(para, inputs);
}

function rightSection(currGuess) {
  guessedCombos.push("#" + currGuess);

  let combos = document.createElement("p");
  combos.id = guesses - 1 + "a";

  combos.innerHTML = guessedCombos[guesses - 1];
  document.querySelector(".guessed").appendChild(combos);

  document.querySelector(".livesnum").innerHTML = 9 - guesses;
}

function winOrNot(para, inputs) {
  for (let j = 0; j < para.length; j++) {
    if (para[j].innerHTML != "✔️") return;
  }

  endGame(true);
}

function endGame(finalRes) {
  let result = document.querySelector(".result");
  if (finalRes) {
    result.innerHTML = "Congratulations! You guessed the color hex🥳";

    scoreboard(true);

    colorsWon.push("#" + rColor);
    let string = JSON.stringify(colorsWon);
    localStorage.setItem("winHistory", string); //updating win history

    livesUsedWhenWon.push(guesses);
    let str = JSON.stringify(livesUsedWhenWon);
    localStorage.setItem("livesUsedWhenWon", str);
  } else {
    result.innerHTML = "Game Over ;-;";
    scoreboard(false);
  }
  let inputs = document.querySelectorAll('input[type = "text"]');
  inputs.forEach((el) => {
    el.disabled = true;
    //disable all input fields
  });

  const newgame = document.createElement("button");
  newgame.innerHTML = "New Game";
  newgame.setAttribute("class", "btn");
  document.querySelector(".newgame").appendChild(newgame);

  newgame.addEventListener("click", () => {
    newGame();
  });
}

function newGame() {
  guesses = 0;

  let inputs = document.querySelectorAll('input[type = "text"]');
  let para = document.querySelectorAll(
    'p[id="0"], p[id="1"], p[id="2"], p[id="3"], p[id="4"], p[id="5"]'
  );

  let j = 0;
  inputs.forEach((el) => {
    el.disabled = false;
    el.value = "";
    para[j].innerHTML = "";
    j++;
  });

  document.querySelector(".result").innerHTML = "";
  document.querySelector(".hint").innerHTML = "";

  for (let i = 0; i < guessedCombos.length; i++) {
    let combo = document.getElementById(i + "a");
    combo.remove();
  }
  guessedCombos = [];

  const btn = document.querySelector(".btn");
  btn.remove();
  startGame();
}

//HINT
document.querySelector(".bulb").addEventListener("click", () => {
  document.querySelector(".hint").innerHTML =
    "Clue:- Every digit of a hex code lies between 0 and F both included.";
  document.querySelector(".hint").style.margin = "1rem";
  document.querySelector(".hint").style.fontSize = "large";
});

//Score
function scoreboard(outcome) {
  if (outcome) {
    let wins = Number(localStorage.getItem("wins"));
    wins += 1;
    localStorage.setItem("wins", wins);
  } else {
    let losses = Number(localStorage.getItem("losses"));
    losses += 1;
    localStorage.setItem("losses", losses);
  }

  document.querySelector(".wins").innerHTML =
    window.localStorage.getItem("wins");
  document.querySelector(".losses").innerHTML =
    window.localStorage.getItem("losses");
}

//WINHISTORY
document.querySelector("#history").addEventListener("click", () => {
  let btn = document.querySelector(".history");
  let btnHistory = document.createElement("div");

  let winHistoryStr = localStorage.getItem("winHistory");
  let livesStr = localStorage.getItem("livesUsedWhenWon");

  let winHistoryArray = winHistoryStr ? JSON.parse(winHistoryStr) : [];
  let livesArray = livesStr ? JSON.parse(livesStr) : [];

  if (winHistoryArray.length && livesArray.length) {
    let tableHTML = `<table>
      <tr><th>Colors</th><th>Lives Used</th></tr>`;

    winHistoryArray.forEach((item, i) => {
      let livesUsed = livesArray[i] ?? "N/A"; // Use 'N/A' if livesArray is shorter
      tableHTML += `<tr><td>${item}</td><td>${livesUsed}</td></tr>`;
    });

    tableHTML += `</table>`;
    btnHistory.innerHTML = tableHTML;
    btn.appendChild(btnHistory);
  } else {
    btnHistory.innerHTML = `<p>No history available.</p>`;
    btn.appendChild(btnHistory);
  }
});

function resetScore() {
  localStorage.setItem("wins", "0");
  alert("Score reset to 0");
}
