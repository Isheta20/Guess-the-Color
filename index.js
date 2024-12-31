window.onload = function () {
  startGame();
  if(!localStorage.getItem('wins')){
    localStorage.setItem('wins', '0');
  }
  document.querySelector(".wins").innerHTML = window.localStorage.getItem('wins');
  document.querySelector(".livesnum").innerHTML = 10-guesses;
};

let rColor;
function startGame() {
  rColor = randomColor();
  let x = "#"+rColor;
  // console.log(x);
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

let guessedCombos = [];
const form = document.querySelector("form");
let guesses = 0;
function submitHandler(e) {
  e.preventDefault();
  let inputs = document.querySelectorAll('input[type="text"]');

  guesses++;
  ChkGuess();
  ChkColor(inputs);
}
form.addEventListener("submit", submitHandler);

function ChkGuess() {
  
  if (guesses > 10) endGame();
  console.log("chkGuess");
}

function ChkColor(inputs) {
  let para = document.querySelectorAll(
    'p[id="0"], p[id="1"], p[id="2"], p[id="3"], p[id="4"], p[id="5"]'
  );
  
  let i = 0;
  let currGuess = '';
  inputs.forEach((element) => {

    // console.log("rColor[i]:", rColor[i], typeof rColor[i]);
    // console.log("element.value:", element.value, typeof element.value);
    
    let val = element.value.toUpperCase()
    currGuess = currGuess+val;

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

function rightSection(currGuess){

  guessedCombos.push('#'+currGuess);
  console.log(currGuess);
  console.log(guessedCombos);

  let combos = document.createElement('p');
  combos.id = guesses-1 + 'a';
  console.log(guesses-1);
  
  console.log(guessedCombos[guesses-1]);
  combos.innerHTML = guessedCombos[guesses-1];
  document.querySelector(".guessed").appendChild(combos);

  document.querySelector(".livesnum").innerHTML = 10-guesses;
}

function winOrNot(para, inputs) {

  console.log(para);
  
  for(let j=0; j<para.length; j++){

    console.log(para[j], para[j].innerHTML, para[j].innerHTML != "✔️");
    if (para[j].innerHTML != "✔️") return;
  }

  
  endGame();
}

function endGame() {

  let result = document.querySelector(".result");
  if (guesses <= 10) {
    result.innerHTML = "Congratulations! You guessed the color hex🥳";
    scoreboard();
    //Give end result wether won or failed in the else
  } else {
    result.innerHTML = "Game Over ;-;";
  }
  let inputs = document.querySelectorAll('input[type = "text"]');
  inputs.forEach((el) => {
    el.disabled = true;
  });

  //disable all input fields
  //make the result clickable or create a button to startGame again
  const newgame = document.createElement("button");
  newgame.innerHTML = "New Game"
  newgame.setAttribute("class", "btn")
  document.querySelector(".newgame").appendChild(newgame);

  newgame.addEventListener("click", ()=>{
    newGame();
  })
  
}

function newGame(){

  guesses = 0;

  let inputs = document.querySelectorAll('input[type = "text"]');
  let para = document.querySelectorAll(
    'p[id="0"], p[id="1"], p[id="2"], p[id="3"], p[id="4"], p[id="5"]'
  );

  let j = 0;
  inputs.forEach((el) => {
    el.disabled = false;
    el.value = "";
    para[j].innerHTML = ""
    j++;
  });

  document.querySelector(".result").innerHTML = "";
  document.querySelector(".hint").innerHTML = "";

  for(let i=0; i<guessedCombos.length; i++){

    let combo = document.getElementById(i+'a');
    combo.remove();
  }

  const btn = document.querySelector(".btn");
  btn.remove();
  startGame();
  
}


//HINT
document.querySelector(".bulb").addEventListener('click', ()=>{
  document.querySelector(".hint").innerHTML = "Clue:- Every digit of a hex code lies between 0 and F both included."
  document.querySelector(".hint").style.margin = "1rem";
  document.querySelector(".hint").style.fontSize = "large";
})


//Score

function scoreboard(){

  if(localStorage.wins){
    let wins = Number(localStorage.getItem('wins'));
    wins+=1;
    localStorage.setItem('wins', wins);
  }
  else{
    localStorage.setItem('wins', '1');
  }
  document.querySelector(".wins").innerHTML = window.localStorage.getItem('wins');
}

function resetScore() {
  localStorage.setItem('wins', '0');
  alert('Score reset to 0');
}
