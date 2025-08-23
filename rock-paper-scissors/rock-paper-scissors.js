 // example of default operator 
  let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = 
      `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  }
  
  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';
      } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove = 'paper';
      } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
        }

    return computerMove;
  }
  
  let isAutoPlaying = false;
  let intervalId;

  function autoPlay() {
    if (!isAutoPlaying) {
      // run every thousenth millisecond
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }


  function playGame(chosenMove) {
    const computerMove = pickComputerMove();
    
    let result = '';

    if (computerMove == chosenMove) {
      result = 'Tie.'
    } else if (computerMove === 'paper') {
      if (chosenMove === 'scissors') {
        result = 'You win.'
      } else {
        result = 'You lose.'
      }
    } else if (computerMove === 'rock') {
      if (chosenMove === 'paper') {
        result = 'You win.'
      } else {
        result = 'You lose.'
      }
    } else {
      if (chosenMove === 'rock') {
        result = 'You win.'
      } else {
        result = 'You lose.'
      }
    }

    if (result === "You win.") {
      score.wins++;
    } else if (result === "You lose.") {
      score.losses++;
    } else {
      score.ties++;
    }

    // save the results
    // local storage only supports strings
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = 
      `You <img src="images/${chosenMove}-emoji.png" class="move-icon"> - <img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
  }