document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameOver = false;
    let scoreX = 0;
    let scoreO = 0;

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
                highlightWinner();
                updateScore();
                gameOver = true;
                return;
            }
            if (checkDraw()) {
                alert("It's a draw!");
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

    // Highlight the winning cells
    function highlightWinner() {
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
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
                return;
            }
        }
    }

    // Check for a draw
    function checkDraw() {
        const cells = document.querySelectorAll('.cell');
        return [...cells].every(cell => cell.textContent !== '');
    }

    // Update the score
    function updateScore() {
        if (currentPlayer === 'X') {
            scoreX++;
        } else {
            scoreO++;
        }
        document.getElementById('scoreX').textContent = scoreX;
        document.getElementById('scoreO').textContent = scoreO;
    }

    // Reset the game
    resetButton.addEventListener('click', function() {
        const cells = document.querySelectorAll('.cell');
        for (const cell of cells) {
            cell.textContent = '';
            cell.classList.remove('winner');
        }
        currentPlayer = 'X';
        gameOver = false;
    });
});
