let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultPara');

const p = document.createElement('p');

let prevGuesses = [];
let guessCount = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess){
    if(guess < 1 || guess > 100 || isNaN(guess)){
        alert('Please enter a number between 1 and 100');
    }
    else{
        prevGuesses.push(guess);
        if(guessCount === 11){
            displayGuess(guess)
            displayMsg(`Game Over. The number was ${randomNumber}`);
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMsg("You guessed it right! Hurray!!");
        endGame();
    }
    else if(guess < randomNumber){
        displayMsg("Your guess is too low");
    }
    else if(guess > randomNumber){
        displayMsg("Your guess is too high");
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    guessCount++;
    remaining.innerHTML = `${11 - guessCount}`;
}

function displayMsg(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', ''); //has to be key-value pair
    p.classList.add('button');
    p.innerHTML = `<h2 style="cursor: pointer;" id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuesses = [];
        guessCount = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - guessCount}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        displayMsg('');

        playGame = true
    })
}



