document.addEventListener("DOMContentLoaded", function() {
  const board = document.getElementById('board');
  let currentPlayer = 'X';
  let gameOver = false;

  // Create the Tic Tac Toe grid
  for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleClick);
      board.appendChild(cell);
  }

  // Handle clicks on the grid
  function handleClick(event) {
      if (gameOver) return;
      const cell = event.target;
      if (cell.textContent === '') {
          cell.textContent = currentPlayer;
          if (checkWinner()) {
              alert(currentPlayer + " wins!");
              gameOver = true;
              return;
          }
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      } else {
          alert('This cell is already occupied!');
      }
  }

  // Check for a winner
  function checkWinner() {
      const cells = document.querySelectorAll('.cell');
      const winningCombinations = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
      ];
      for (const combination of winningCombinations) {
          const [a, b, c] = combination;
          if (cells[a].textContent &&
              cells[a].textContent === cells[b].textContent &&
              cells[a].textContent === cells[c].textContent) {
              return true;
          }
      }
      return false;
  }
});
