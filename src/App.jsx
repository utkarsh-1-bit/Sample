import React, { useEffect, useState } from "react";

const games = [
  { id: "tic-tac-toe", icon: "⭕", name: "Tic-Tac-Toe", tag: "2 players", color: "mint" },
  { id: "memory", icon: "🧠", name: "Memory Match", tag: "Brain boost", color: "pink" },
  { id: "rock-paper-scissors", icon: "✌️", name: "Rock Paper Scissors", tag: "Quick rounds", color: "yellow" },
];

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const memoryFaces = ["🍓", "🐸", "🌈", "🍕", "🦋", "🍉"];
const choices = [
  { id: "rock", icon: "✊", label: "Rock" },
  { id: "paper", icon: "✋", label: "Paper" },
  { id: "scissors", icon: "✌️", label: "Scissors" },
];

function getWinner(squares) {
  for (const [first, second, third] of winningLines) {
    if (squares[first] && squares[first] === squares[second] && squares[first] === squares[third]) {
      return squares[first];
    }
  }
  return null;
}

function shuffleCards() {
  return [...memoryFaces, ...memoryFaces]
    .map((face) => ({ face, sort: Math.random() }))
    .sort((first, second) => first.sort - second.sort)
    .map(({ face }) => face);
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = getWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const isGameOver = Boolean(winner || isDraw);
  const nextPlayer = squares.filter(Boolean).length % 2 === 0 ? "X" : "O";

  function play(index) {
    if (squares[index] || isGameOver) return;
    const nextSquares = [...squares];
    nextSquares[index] = nextPlayer;
    setSquares(nextSquares);
  }

  let status = `Player ${nextPlayer}’s turn`;
  if (winner) status = `Player ${winner} wins!`;
  if (isDraw) status = "It’s a draw!";

  return (
    <div className="game-content">
      <div className={`game-status${winner ? " status-winner" : ""}`} aria-live="polite">
        {!isGameOver && <span className={`player-token token-${nextPlayer.toLowerCase()}`}>{nextPlayer}</span>}
        {status}
      </div>
      <div className="board" role="group" aria-label="Tic-Tac-Toe board">
        {squares.map((square, index) => (
          <button
            className={`cell${square ? ` cell-${square.toLowerCase()}` : ""}`}
            key={index}
            type="button"
            onClick={() => play(index)}
            disabled={Boolean(square) || isGameOver}
            aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${square ? `: ${square}` : ""}`}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="action-button" type="button" onClick={() => setSquares(Array(9).fill(null))}>
        <span aria-hidden="true">↻</span> New game
      </button>
    </div>
  );
}

function MemoryMatch() {
  const [cards, setCards] = useState(shuffleCards);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length !== 2) return undefined;
    if (cards[flipped[0]] === cards[flipped[1]]) {
      setMatched((current) => [...current, ...flipped]);
      setFlipped([]);
      return undefined;
    }
    const timeout = window.setTimeout(() => setFlipped([]), 850);
    return () => window.clearTimeout(timeout);
  }, [cards, flipped]);

  function flipCard(index) {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    if (flipped.length === 1) setMoves((current) => current + 1);
    setFlipped((current) => [...current, index]);
  }

  function reset() {
    setCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  const isComplete = matched.length === cards.length;

  return (
    <div className="game-content">
      <div className="memory-score" aria-live="polite">
        <span><strong>{moves}</strong> moves</span>
        <span><strong>{matched.length / 2}</strong> / 6 pairs</span>
      </div>
      <div className="memory-board" role="group" aria-label="Memory Match cards">
        {cards.map((face, index) => {
          const isRevealed = flipped.includes(index) || matched.includes(index);
          return (
            <button
              className={`memory-card${isRevealed ? " memory-card-open" : ""}${matched.includes(index) ? " memory-card-matched" : ""}`}
              key={`${face}-${index}`}
              type="button"
              onClick={() => flipCard(index)}
              disabled={matched.includes(index) || flipped.length === 2}
              aria-label={isRevealed ? `${face}${matched.includes(index) ? ", matched" : ""}` : "Hidden card"}
            >
              <span>{isRevealed ? face : "✦"}</span>
            </button>
          );
        })}
      </div>
      <p className="game-hint" aria-live="polite">
        {isComplete ? "Amazing memory! You found every pair! 🎉" : "Find all 6 matching pairs!"}
      </p>
      <button className="action-button" type="button" onClick={reset}>
        <span aria-hidden="true">↻</span> Shuffle &amp; replay
      </button>
    </div>
  );
}

function RockPaperScissors() {
  const [round, setRound] = useState({ player: null, computer: null, result: "Choose your move!" });
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  function play(player) {
    const computer = choices[Math.floor(Math.random() * choices.length)].id;
    const didWin = (player === "rock" && computer === "scissors")
      || (player === "paper" && computer === "rock")
      || (player === "scissors" && computer === "paper");
    const result = player === computer ? "It’s a tie!" : didWin ? "You win this round!" : "Computer wins this round!";
    setRound({ player, computer, result });
    setScore((current) => ({
      player: current.player + Number(didWin),
      computer: current.computer + Number(player !== computer && !didWin),
      ties: current.ties + Number(player === computer),
    }));
  }

  function reset() {
    setRound({ player: null, computer: null, result: "Choose your move!" });
    setScore({ player: 0, computer: 0, ties: 0 });
  }

  const getChoice = (id) => choices.find((choice) => choice.id === id);

  return (
    <div className="game-content">
      <div className="scoreboard" aria-label="Score">
        <div><strong>{score.player}</strong><span>You</span></div>
        <span className="score-divider">:</span>
        <div><strong>{score.computer}</strong><span>Computer</span></div>
      </div>
      <div className="duel-display" aria-live="polite">
        <div className="duel-side">
          <span className="duel-emoji">{getChoice(round.player)?.icon || "🤔"}</span>
          <span>You</span>
        </div>
        <strong className="versus">VS</strong>
        <div className="duel-side">
          <span className="duel-emoji">{getChoice(round.computer)?.icon || "🤖"}</span>
          <span>Computer</span>
        </div>
      </div>
      <p className="round-result" aria-live="polite">{round.result}</p>
      <div className="choice-row" aria-label="Choose rock, paper, or scissors">
        {choices.map((choice) => (
          <button className={`choice-button choice-${choice.id}`} key={choice.id} type="button" onClick={() => play(choice.id)}>
            <span>{choice.icon}</span>
            {choice.label}
          </button>
        ))}
      </div>
      <button className="action-button" type="button" onClick={reset}>
        <span aria-hidden="true">↻</span> Reset score
      </button>
    </div>
  );
}

export default function App() {
  const [activeGame, setActiveGame] = useState(games[0].id);
  const currentGame = games.find((game) => game.id === activeGame);
  const descriptions = {
    "tic-tac-toe": "Challenge a friend to the classic three-in-a-row.",
    memory: "Flip the cards and find all the matching pairs.",
    "rock-paper-scissors": "Pick your move and see if you can beat the bot!",
  };

  return (
    <main className="arcade">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="sparkle sparkle-one" aria-hidden="true">✦</div>
      <div className="sparkle sparkle-two" aria-hidden="true">✧</div>

      <header className="topbar">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">✦</span>
          <span>PIXEL<span className="brand-highlight">POP</span></span>
        </div>
        <span className="online-badge"><span /> MINI ARCADE</span>
      </header>

      <section className="welcome">
        <p className="eyebrow"><span aria-hidden="true">✹</span> PICK YOUR HAPPY PLACE</p>
        <h1>Little games.<br /><span>Big fun.</span></h1>
        <p className="welcome-copy">Take a tiny break and let the good times roll.</p>
      </section>

      <nav className="game-picker" aria-label="Choose a game">
        {games.map((game) => (
          <button
            className={`game-tab tab-${game.color}${activeGame === game.id ? " game-tab-active" : ""}`}
            key={game.id}
            type="button"
            onClick={() => setActiveGame(game.id)}
            aria-pressed={activeGame === game.id}
          >
            <span className="tab-icon" aria-hidden="true">{game.icon}</span>
            <span className="tab-copy"><strong>{game.name}</strong><small>{game.tag}</small></span>
            <span className="tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </nav>

      <section className={`play-card play-${currentGame.color}`} aria-labelledby="active-game-title">
        <div className="play-card-top">
          <div>
            <span className="now-playing"><span /> NOW PLAYING</span>
            <h2 id="active-game-title">{currentGame.name}</h2>
            <p>{descriptions[activeGame]}</p>
          </div>
          <span className="game-sticker" aria-hidden="true">{currentGame.icon}</span>
        </div>
        {activeGame === "tic-tac-toe" && <TicTacToe />}
        {activeGame === "memory" && <MemoryMatch />}
        {activeGame === "rock-paper-scissors" && <RockPaperScissors />}
      </section>

      <footer className="page-footer">GOOD VIBES &amp; ONE MORE ROUND <span aria-hidden="true">✦</span></footer>
    </main>
  );
}
