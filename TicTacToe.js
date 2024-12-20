const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (boardState[index] !== "" || checkWinner()) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
  } else if (boardState.every((cell) => cell !== "")) {
    alert("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function restartGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

restartButton.addEventListener("click", restartGame);
