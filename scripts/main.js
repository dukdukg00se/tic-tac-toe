// factory function to create new player objects
const player = (name, mark) => {
  const moves = [];
  return { name, mark, moves };
};

// gameboard module to set and control board during play
const board = (() => {
  const gameBoard = document.querySelector('#board-container');
  // set board at start
  for (let i = 0; i < 9; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.id = i ;
    gameBoard.appendChild(grid);
  }
  // function to erase player marks
  const reset = () => {
    const grid = document.querySelectorAll('.grid');
    grid.forEach(box => {
      box.textContent = '';
      box.style.pointerEvents = '';
    });   
  };
  // disable board to prevent further moves
  const disableBoard = () => {
    gameBoard.style.pointerEvents = 'none';
  };
  // enable board for play 
  const enableBoard = () => {
    gameBoard.style.pointerEvents = '';
  };
  return { reset, disableBoard, enableBoard };
})();

// main module for game play
const gamePlayController = (() => {
  // set players
  const playerX = player("Player X", "X");
  const playerO = player("Player O", "O");
  // start conditions
  let activePlayer = playerX;
  let counter = 0;
  let gameOver = false;
  let winner = false;
  // function to check if win conditions met
  const checkWinner = (moves) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winConditions.some((condition) => {
      return condition.every((num) => moves.includes(num));
    });
  };
  // control gameflow and marks
  const play = (e) => {
    if (counter < 9) {
      e.target.textContent = activePlayer.mark;
      activePlayer.moves.push(+e.target.id);
      e.target.style.pointerEvents = "none";
    }

    if (checkWinner(activePlayer.moves)) {
      gameOver = true;
      winner = activePlayer.name;
    } else if (counter === 8) {
      gameOver = true;
    }

    if (gameOver) {
      displayController.modalController(winner, activePlayer.name);
      board.disableBoard();
      return;
    }

    displayController.showActivePlayer();
    counter++;
    activePlayer === playerX
      ? (activePlayer = playerO)
      : (activePlayer = playerX);
  };
  // reset variables and board to start conditions
  const resetGame = () => {
    if (!displayController.playerX.classList.contains('active')) {
      displayController.playerX.classList.toggle('active');
      displayController.playerO.classList.toggle('active');
    }
    playerX.moves = [];
    playerO.moves = [];
    activePlayer = playerX;
    counter = 0;
    gameOver = false;
    winner = false;
    board.reset();
    board.enableBoard();
  };

  const grid = document.querySelectorAll(".grid");
  grid.forEach((box) => {
    box.addEventListener("click", play);
  });

  let reset = document.querySelector('#reset-btn');
  reset.addEventListener('click', resetGame);
})();

// module to control modal and active player indicators
const displayController = (() => {
  const modal = document.querySelector('#modal');
  const modalHeader = document.querySelector('#modal-header');
  const closeBtn = document.querySelector('.close');
  const playerX = document.querySelector('#player-x');
  const playerO = document.querySelector('#player-o');
  // function indicates player's turn by highlighting player button
  const showActivePlayer = () => {
    playerX.classList.toggle('active');
    playerO.classList.toggle('active');
  };
  // open modal and set text to declare winner or tie
  const modalController = (winnerDeclared, winnerName) => {
    winnerDeclared ? modalHeader.textContent = `${winnerName} Wins!` : modalHeader.textContent = "Its a Tie!";
    modal.style.display = "block";
  };
  // close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
  });
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  return { showActivePlayer, modalController, playerX, playerO };
})();