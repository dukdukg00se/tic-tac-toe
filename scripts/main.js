// player factory
const player = (name, mark) => {
  const movesArr = [];
  return { name, mark, movesArr }
}

// make gameboard
const board = (() => {
  const gameboard = document.querySelector('#board-container');
  for (let i = 0; i < 9; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.id = i ;
    gameboard.appendChild(grid);
  }

  const reset = () => {
    const grid = document.querySelectorAll('.grid');
    grid.forEach(box => {
      box.textContent = '';
    })   
  };

  return { reset };
})();


// check for winner
const checkWinner = (() => {
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

  const isWinner = (arr) => {
    return winConditions.some((eachArr) => {
      return eachArr.every((num) => arr.includes(num));
    });
  };

  return { isWinner };
})();


const gamePlay = (() => {
  const playerX = player('Player X', 'X');
  const playerO = player('Player O', 'O');
  // start conditions
  let activePlayer = playerX;
  let counter = 0;
  let gameWon = false;

  const grid = document.querySelectorAll('.grid');
  grid.forEach(box => {
    box.addEventListener('click', (e) => {
      if (counter < 9) {
        box.textContent = activePlayer.mark;
        activePlayer.movesArr.push(+e.target.id);
        // console.log(checkWinner.isWinner(activePlayer.movesArr));
        // counter++;
        // activePlayer === playerX ? activePlayer = playerO : activePlayer = playerX;
        // remove eventlistener from marked cells

        e.target.style.pointerEvents = 'none';
      }

      if (!checkWinner.isWinner(activePlayer.movesArr)) {
        counter++;
        activePlayer === playerX ? activePlayer = playerO : activePlayer = playerX;
      } else {
        gameWon = true;
        console.log(gameWon);
        const modal = document.querySelector('#modal');
        const modalHeader = document.querySelector('#modal-header');
        modalHeader.textContent = `${activePlayer.name} Wins!`
        modal.style.display = 'block';

      }

      console.log(gameWon, counter);

    });
  });

  // console.log(gameWon);
  return {
    activePlayer,
    counter,
    gameWon
  };

})();


// const closeIt = (e) => {
//   if (e.target == modal) {
//     modal.style.display = "none";
//   }
// };

const displayController = (() => {



  const closeModal = () => {
    // modal.style.display = 'none';
    // console.log(modal);
  }
  return { closeModal };


})();

// window.addEventListener('click', displayController.closeModal());

// const closeBtn = document.querySelector('.close');
// closeBtn.addEventListener('click', () => {
//   modal.style.display = "none";

//   let board = document.querySelector('#board-container');
//   board.style.pointerEvents = 'none';
// });

// let reset = document.querySelector('#reset-btn');
// reset.addEventListener('click', (e) => {
//   console.log(e);
//   let parent = document.querySelector('#board-container');
//   removeAllChildNodes(parent); 
//   makeBoard.setboard();
// });

// function removeAllChildNodes(parent) {
//   while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
//   }
// }