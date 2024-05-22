document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 3;
    const board = Array(boardSize * boardSize).fill(null);
    const gameBoard = document.getElementById('game-board');

    // Create the game board
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(index));
        gameBoard.appendChild(cell);
    });

    function makeMove(index) {
        if (!board[index]) {
            board[index] = 'S';
            render();
            if (!checkWin('S')) {
                computerMove();
                render();
                checkWin('O');
            }
        }
    }

    function computerMove() {
        const emptyIndices = board.map((value, index) => value === null ? index : null).filter(index => index !== null);
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        board[randomIndex] = 'O';
    }

    function render() {
        gameBoard.childNodes.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    function checkWin(player) {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        const isWin = winningPatterns.some(pattern => 
            pattern.every(index => board[index] === player)
        );

        if (isWin) {
            alert(`${player} kazandı!`);
            resetGame();
        }

        return isWin;
    }

    function resetGame() {
        board.fill(null);
        render();
    }
});
