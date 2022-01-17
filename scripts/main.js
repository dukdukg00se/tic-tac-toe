// const gameBoard = document.querySelector('#board-container');

// // if wrapped in IIFE will auto set gameboard
// // const board = (() => {
// //   for (let i = 0; i < 3; i++) {
// //     for (let j = 0; j < 3; j++) {
// //       const grid = document.createElement('div');
// //       grid.classList.add('grid');
// //       grid.id = i + '-' + j;
// //       gameBoard.appendChild(grid);


// //     }
// //   }
// // })();

// let arr = [,,,,,,,,,];
// for (let i = 0; i < arr.length; i++) {
//   const grid = document.createElement('div');
//   grid.classList.add('grid');
//   grid.id = i ;
//   gameBoard.appendChild(grid);
// }


// let grid = document.querySelectorAll('.grid');
// // const start = document.querySelector('#start');
// // // currently must click start to set gameboard
// // start.addEventListener('click', () => {
// //   // console.log(gameBoard);
// //   // console.log({gameBoard});
// //   // console.log(grid);
// //   // board();

// //   console.log(grid);

// // });

// grid.forEach((box) => {
//   box.addEventListener('click', () => {
//     box.textContent = 'O';
//   })
// })

const gameBoard = document.querySelector('#board-container');
let arr = [,,,,,,,,,];
for (let i = 0; i < arr.length; i++) {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.id = i ;
  gameBoard.appendChild(grid);
}

let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], 
  [2, 4, 6] 
]
let playerXArr = [];
let playerOArr = [];

let grid = document.querySelectorAll('.grid');
let counter = 0;
grid.forEach(box => {
  box.addEventListener('click', (e) => { 
    if (counter < 9) {

      if (counter % 2 === 0) { // even #; player X turn
        box.textContent = 'X';
        playerXArr.push(e.target.id);
      } else { // odd #; player O turn
        box.textContent = 'O'; 
        playerOArr.push(e.target.id);
      }

      winConditions.map(arr => {
        if (arr.every(num => playerXArr.includes(num.toString()))) {
          console.log('yesss');
        } else if (arr.every(num => playerOArr.includes(num.toString()))) {
          console.log('noooo');
        } else if (counter === 8) {
          console.log('Tiiieee');
        }
      });


    };
    counter++;
  });
});

