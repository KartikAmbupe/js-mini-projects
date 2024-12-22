const startGameBtn = document.getElementById('start-game-btn');

// function startGame(){
//     console.log('game is starting');
// } //here we are using function as a declaration

// const start = function(){
//     console.log('game is starting');
// }; //here we are using function as an expression, so now the function name is not necessary. This is now called as an anonymous function
/*
const person = {
    greet: function greet(){
        console.log('Hello!');
    }//this function is now called a method
};

person.greet();
*/

// console.dir(startGame);

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAUT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'You Win!';
const RESULT_COMPUTER_WINS = 'Computer Wins!';

let gameIsRunning = false;

const getPlayerChoice = function () {
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`,'').toUpperCase();
    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS){
        alert(`Invalid choice! We chose ${DEFAUT_USER_CHOICE} for you!`);
        return;
    }
    return selection;
}

const getComputerChoice = function(){//this is called an anonymous function
    const randomValue = Math.random();
    if(randomValue < 0.34){
        return ROCK;
    }
    else if(randomValue < 0.67){
        return PAPER;
    }
    else{
        return SCISSORS;
    }
}

// const getWinner = function(cChoice, pChoice){
//     if(cChoice === pChoice){
//         return RESULT_DRAW;
//     }
//     else if(cChoice === ROCK && pChoice === PAPER ||
//         cChoice === PAPER && pChoice === SCISSORS ||
//         cChoice === SCISSORS && pChoice === ROCK){
//             return RESULT_PLAYER_WINS;
//     }
//     else{
//         return RESULT_COMPUTER_WINS;
//     }  
// }

// we can use the below code in place of above with the help of arrow function
// we write the function without {} as there is only one expression inside the if else loop
const getWinner = (cChoice, pChoice = DEFAUT_USER_CHOICE) => //default arguements
    cChoice === pChoice //if
    ? RESULT_DRAW : 
    (cChoice === ROCK && pChoice === PAPER ||
    cChoice === PAPER && pChoice === SCISSORS ||
    cChoice === SCISSORS && pChoice === ROCK)//elseif
    ? RESULT_PLAYER_WINS 
    : RESULT_COMPUTER_WINS;//else

startGameBtn.addEventListener('click', () => {
//here we are passing a pointer at a function to another function
//this is a call-back function, it passes an arguement for another function that is the addEventListener function
if(gameIsRunning){
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    let winner;
    if(playerChoice){
        winner = getWinner(computerChoice, playerChoice);
    }
    else{
        winner = getWinner(computerChoice);
    }
//    const winner = getWinner(playerChoice, computerChoice);
    
    let message = `You picked ${playerChoice || DEFAUT_USER_CHOICE}, computer picked ${computerChoice} `;
    
    if(winner === RESULT_DRAW){
        message = message + `hence its a DRAW!`;
    }
    else if(winner === RESULT_PLAYER_WINS){
        message = message + 'You Win!';
    }
    else{
        message = message + 'Computer Wins!';
    }
    alert(message);
    gameIsRunning = false;
}); 


//not related to game


//... -> this is called spread/rest operator, it spreads the array into individual arguements
//the rest parameter should be passed at the end of the parameter list if there are multiple parameters
const combine = (resultHandler, operation, ...numbers) => {
    //we can create functions inside functions
    const validateNumber = (number) => {
        return isNaN(number)? 0 : number;
    }
    let sum = 0;
    for(const num of numbers){
        if(operation === 'ADD'){
            sum += validateNumber(num);
        }
        else if(operation === 'SUBTRACT'){
            sum -= validateNumber(num);
        }
    }
    resultHandler(sum);
};

