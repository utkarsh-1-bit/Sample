import { useState } from "react";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(squares) {
  for (const [first, second, third] of winningLines) {
    if (squares[first] && squares[first] === squares[second] && squares[first] === squares[third]) {
      return squares[first];
    }
  }
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = getWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const isGameOver = winner || isDraw;
  const nextPlayer = squares.filter(Boolean).length % 2 === 0 ? "X" : "O";

  function play(index) {
    if (squares[index] || isGameOver) return;
    const nextSquares = [...squares];
    nextSquares[index] = nextPlayer;
    setSquares(nextSquares);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
  }

  let status = `Player ${nextPlayer}’s turn`;
  if (winner) status = `Player ${winner} wins!`;
  if (isDraw) status = "It’s a draw!";

  return (
    <main className="page">
      <section className="game-card" aria-labelledby="game-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> TWO PLAYER GAME</div>
        <h1 id="game-title">Tic-Tac-Toe</h1>
        <p className="subtitle">A little friendly competition.</p>

        <div className={`status${winner ? " status-winner" : ""}`} aria-live="polite">
          {!isGameOver && <span className={`turn-marker marker-${nextPlayer.toLowerCase()}`}>{nextPlayer}</span>}
          {status}
        </div>

        <div className="board" role="group" aria-label="Tic-Tac-Toe board">
          {squares.map((square, index) => (
            <button
              className={`cell${square ? ` cell-${square.toLowerCase()}` : ""}`}
              key={index}
              type="button"
              onClick={() => play(index)}
              disabled={Boolean(square) || Boolean(isGameOver)}
              aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${square ? `: ${square}` : ""}`}
            >
              {square}
            </button>
          ))}
        </div>

        <button className="reset-button" type="button" onClick={resetGame}>
          <span aria-hidden="true">↻</span> New game
        </button>
        <p className="footer-note">First to line up three wins</p>
      </section>
    </main>
  );
}
