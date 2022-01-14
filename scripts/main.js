

const gameBoard = document.querySelector('#board-container');

// if wrapped in IIFE will auto set gameboard
const board = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const grid = document.createElement('div');
      grid.classList.add('grid')
      gameBoard.appendChild(grid);

    }
  }
}; 

const start = document.querySelector('#start');
// currently must click start to set gameboard
start.addEventListener('click', () => {
  console.log('test');
  board();
});

let grid = document.querySelectorAll('.grid');