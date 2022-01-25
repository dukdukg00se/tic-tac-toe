// player factory function
const player = (name, mark) => {
  const moves = [];
  return { name, mark, moves }
}

// gameboard module to set and control board during play
const board = (() => {
  const gameBoard = document.querySelector('#board-container');
  // set board to start game
  for (let i = 0; i < 9; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.id = i ;
    gameBoard.appendChild(grid);
  }
  // erase player marks function
  const reset = () => {
    const grid = document.querySelectorAll('.grid');
    grid.forEach(box => {
      box.textContent = '';
      box.style.pointerEvents = '';
    })   
  };
  // disable board for play
  const disableBoard = () => {
    gameBoard.style.pointerEvents = 'none';
  }
  // enable board for play 
  const enableBoard = () => {
    gameBoard.style.pointerEvents = '';
  }
  return { reset, disableBoard, enableBoard };
})();


const gamePlay = (() => {
  // set players
  const playerX = player("Player X", "X");
  const playerO = player("Player O", "O");
  // start conditions
  let activePlayer = playerX;
  let counter = 0;
  let gameOver = false;
  let winner = false;
  // function to check for a winner
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
    return winConditions.some((eachArr) => {
      return eachArr.every((num) => moves.includes(num));
    });
  };

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

  const grid = document.querySelectorAll(".grid");
  grid.forEach((box) => {
    box.addEventListener("click", play);
  });

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

  let reset = document.querySelector('#reset-btn');
  reset.addEventListener('click', resetGame);
})();



const displayController = (() => {
  const modal = document.querySelector('#modal');
  const modalHeader = document.querySelector('#modal-header');
  const closeBtn = document.querySelector('.close');
  const playerX = document.querySelector('#player-x');
  const playerO = document.querySelector('#player-o');

  const showActivePlayer = () => {
    playerX.classList.toggle('active');
    playerO.classList.toggle('active');
  }
  const modalController = (winnerDeclared, winnerName) => {
    winnerDeclared ? modalHeader.textContent = `${winnerName} Wins!` : modalHeader.textContent = "Its a Tie!";
    modal.style.display = "block";
  }

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