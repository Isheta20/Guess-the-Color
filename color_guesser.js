let rColor;
function randomColor(){

    hex = "0123456789ABCDEF";
    let color = "#";
    for(let i=0; i<6; i++){

        random = Math.floor(Math.random()*16);
        color+=hex[random];
    }
    return color;
}

const form = document.querySelector("form");

function submitHandler(e){
    e.preventDefault();
    let inputs = document.querySelectorAll('input[type="text"]');
    console.log(inputs);
    
    guesses++;
    ChkGuess();
    ChkColor(inputs);
}
form.addEventListener('submit', submitHandler)

let guesses = 0;

function ChkGuess(){

    if(guesses == 0) startGame();
    else if(guesses > 10) endGame();
}

function ChkColor(inputs){

    let para = document.querySelectorAll('p[id="0"], p[id="1"], p[id="2"], p[id="3"], p[id="4"], p[id="5"]')
    let i = 0;
    inputs.forEach(element => {
        if(randomColor[i] == element.value){
            para[i].innerHtml = "✔️";
        }else if(randomColor[i] <= element.value){
            para[i].innerHtml = "Guessed High";
        }else{
            para[i].innerHtml = "Guessed Low";
        }
    });

    winOrNot(para);
    
}

function winOrNot(para){

    let j = 0;
    inputs.forEach(element =>{
        if(para[j] != "✔️") return;
    })

    endGame();
}

function startGame(){

    rColor = randomColor();
}

function endGame(){

    if(guesses<=10) {

        //Give end result wether won or failed in the else
    }
    //disable all input fields
    //make the result clickable or create a button to startGame again
}