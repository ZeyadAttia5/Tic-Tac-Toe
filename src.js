/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
const gameBoard = (function () {
  const tiles = Array.from(document.querySelectorAll('.grid-btn'));
  const resetBtn = document.querySelector('#gridResetBtn');
  resetBtn.addEventListener('click', _reset);

  function _reset() {
    tiles.forEach((tile) => (tile.textContent = ''));
    tiles.forEach((tile) => tile.removeAttribute('disabled'));
    gameController.reset();
  }

  function _isValid(tile) {
    console.log(tile.textContent)
    if (tile.textContent.toLowerCase() === 'x' || tile.textContent.toLowerCase() === 'o') return false;
    return true;
  }

  tiles.forEach((tile) => tile.addEventListener('click', userAction));
  function userAction(e) {
    if (gameController.gameStatus !== 'inactive' && _isValid(e.target)) {
      e.target.textContent = gameController.currPlayer.value;
      gameController.checkForWinner(tiles);
      if (gameController.winnerDeclared === true);
      gameController.nextPlayer();
    }
  }
  return {
  };
}());

const Player = (name, value) => {
  if (value.toLowerCase() !== 'x' && value.toLowerCase() !== 'o') return false;
  return {
    name,
    value,
  };
};

const gameController = (function () {
  const player1 = Player('player1', 'X');
  const player2 = Player('player2', 'O');
  let remainingTiles = 9;
  const announcement = document.querySelector('#announcement');
  let currPlayer = player1;
  let gameStatus = 'active';
  let winnerDeclared = false;

  function checkForWinner(board) {
    // console.log(`remaining tiles: ${remainingTiles}`);
    // console.log(`this remaining tiles: ${this.remainingTiles}`);
    // Winning combinations
    remainingTiles -= 1;
    if (remainingTiles <= 0) declareTie();
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    // Loop through winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      // Check if the values of the board array at the positions in the current combination match
      if (board[a].textContent && board[a].textContent === board[b].textContent && board[a].textContent === board[c].textContent) {
        // We have a winner
        this.winnerDeclared = true;
        announcement.textContent = `${this.currPlayer.name} won!`;
        announcement.classList.remove('hide');
        this.gameStatus = 'inactive';
      }
    }
    // No winner found
    return null;
  }
  function nextPlayer() {
    this.currPlayer === player1 ? this.currPlayer = player2 : this.currPlayer = player1;
  }
  function declareTie() {
    console.log('TIEEEEEE');
    announcement.textContent = 'Tie!';
    announcement.classList.remove('hide');
    this.gameStatus = 'inactive';
  }
  function reset() {
    remainingTiles = 9;
    this.currPlayer = player1;
    this.winnerDeclared = false;
    this.gameStatus = 'active';
    announcement.classList.add('hide');
  }
  return {
    nextPlayer,
    declareTie,
    checkForWinner,
    currPlayer,
    winnerDeclared,
    reset,
    gameStatus,
  };
}());
