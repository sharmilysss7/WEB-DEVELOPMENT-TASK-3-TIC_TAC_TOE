let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = false;
let mode = ""; // PVP or PVC

const statusDisplay = document.getElementById("status");
const boardContainer = document.getElementById("board");

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  gameActive = true;
  statusDisplay.textContent = `Current Turn: ${currentPlayer}`;
  createBoard();
}

function createBoard() {
  boardContainer.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    boardContainer.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer === "X" ? "❌" : "⭕";

  if (checkWin()) {
    statusDisplay.textContent = `🎉 ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Current Turn: ${currentPlayer}`;

  if (mode === "PVC" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyIndexes = board.map((v, i) => (v === "" ? i : null)).filter(i => i !== null);
  if (emptyIndexes.length === 0) return;
  let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  const cell = document.querySelector(`.cell[data-index='${move}']`);
  cell.click();
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = `Current Turn: ${currentPlayer}`;
  createBoard();
}
