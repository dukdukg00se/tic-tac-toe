const player = (name, mark) => {
  const movesArr = [];
  return { name, mark, movesArr }
}


const gameboard = (() => {
  const movesArr = [];
  const gameboard = document.querySelector('#board-container');

  for (let i = 0; i < 9; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.id = i ;
    gameboard.appendChild(grid);
  }
  return { movesArr };
})();


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


const game = (() => {
  const playerX = player('player X', 'X');
  const playerO = player('player O', 'O');

  // start conditions
  let activePlayer = playerX;
  let counter = 0;

  const grid = document.querySelectorAll('.grid');
  grid.forEach(box => {
    box.addEventListener('click', (e) => {
      if (counter < 9) {
        box.textContent = activePlayer.mark;
        activePlayer.movesArr.push(+e.target.id);
        console.log(checkWinner.isWinner(activePlayer.movesArr));

        counter++;
        activePlayer === playerX ? activePlayer = playerO : activePlayer = playerX;
        
        // remove eventlistener from marked cells
        e.target.style.pointerEvents = 'none';
      }
    })
  });

  // const playGame = (mark, element) => {
  //   if (counter < 9) {
  //     element.textContent = mark;
  //     counter++;
  //     activePlayer === playerX ? activePlayer = playerO : activePlayer = playerX;

  //   }
  // }

  // const grid = document.querySelectorAll('.grid');
  // grid.forEach(box => {
  //   box.addEventListener('click', (e) => {
  //     playGame(activePlayer.mark, box);
  //     // e.target.removeEventListener('click');
  //     console.log(box);
  //   });
  // })

  // function markBox(sign, elem) {
  //   if (counter < 9) {
  //     elem.textContent = sign;
  //     counter++;
  //   }
  // }



 
  // grid.forEach(box => {
  //   box.addEventListener('click', (e) => {
  //     markBox(activePlayer.mark, box);
  //     activePlayer === playerX ? activePlayer = playerO : activePlayer = playerX;
  //     e.target.removeEventListener('click', markBox);
  //   });
  // })

  // grid.forEach(box => {
  //   box.addEventListener('click', (e) => {
  //     if (counter < 9) {
  //       box.textContent = activePlayer.mark;
  //       counter++;
  //       activePlayer === playerX ? activePlayer = playerO : activePlayer = playerX;
  //       e.target.removeEventListener('click');
  //     }

  //   })
  // });

})();