let score = localStorage.getItem('score') ? JSON.parse(localStorage.getItem('score')) : { 
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
  }
  
  function playGame(playerMove){
    const computerMove = pickComputerMove();
  
    let result = ' ';
    
    if (playerMove === 'Scissors'){
      if (computerMove === 'Rock'){
      result = 'You lose.'
      }
      else if(computerMove === 'Paper'){
        result = 'You won!'
      }
      else if (computerMove === 'Scissors'){
        result = 'Tie'
      }
    }
    else if (playerMove === 'Paper'){
      if (computerMove === 'Rock'){
        result = 'You won!'
      }
      else if(computerMove === 'Paper'){
        result = 'Tie'
      }
      else if (computerMove === 'Scissors'){
        result = 'You lose.'
      }
    }
    else if (playerMove === 'Rock'){
      if (computerMove === 'Rock'){
        result = 'Tie'
      }
      else if(computerMove === 'Paper'){
        result = 'You lose.'
      }
      else if (computerMove === 'Scissors'){
        result = 'You won!'
      }
    }
  
    if (result === 'You won!'){
      score.wins += 1;
    } else if (result === 'You lose.'){
      score.losses += 1;
    } else if (result === 'Tie'){
      score.ties += 1;
    }
  
    localStorage.setItem('score', JSON.stringify(score));
  
    updateScoreElement();
  
    document.querySelector('.js-result').innerHTML = result;
  
    document.querySelector('.js-moves').innerHTML =`You
  <img src="/Proj-8_Rock-Paper-scissors/images/${playerMove}-emoji.png" class="moves">
  <img src="/Proj-8_Rock-Paper-scissors/images/${computerMove}-emoji.png" class="moves">
  Computer`;  
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  
  
  function pickComputerMove(){
    const randomNumber = Math.random();
  
    let computerMove = ' ';
  
    if (randomNumber>= 0 && randomNumber < 1/3){
      computerMove = 'Rock';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'Paper'
    }
    else if (randomNumber >=2/3 && randomNumber < 1){
      computerMove = 'Scissors'
    }
    return computerMove;
  }