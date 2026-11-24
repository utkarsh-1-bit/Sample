import React, { useEffect, useState } from "react";

const games = [
  { id: "tic-tac-toe", artwork: "tic-tac-toe", name: "Tic-Tac-Toe", tag: "2 players", color: "mint" },
  { id: "memory", artwork: "memory", name: "Memory Match", tag: "Brain boost", color: "pink" },
  { id: "rock-paper-scissors", artwork: "rock-paper-scissors", name: "Rock Paper Scissors", tag: "Quick rounds", color: "yellow" },
];

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const memoryFaces = ["berry", "frog", "rainbow", "pizza", "butterfly", "melon"];
const memoryLabels = {
  berry: "Strawberry",
  frog: "Frog",
  rainbow: "Rainbow",
  pizza: "Pizza",
  butterfly: "Butterfly",
  melon: "Watermelon",
};
const choices = [
  { id: "rock", artwork: "rock", label: "Rock" },
  { id: "paper", artwork: "paper", label: "Paper" },
  { id: "scissors", artwork: "scissors", label: "Scissors" },
];

const artwork = {
  "tic-tac-toe": (
    <>
      <rect x="10" y="10" width="44" height="44" rx="12" fill="#e7fbf5" />
      <path d="M25 14v36M39 14v36" stroke="#a9ded1" strokeWidth="3" />
      <path d="M14 25h36M14 39h36" stroke="#a9ded1" strokeWidth="3" />
      <path d="m18 18 8 8m0-8-8 8" stroke="#159e86" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="45" cy="45" r="5" fill="none" stroke="#d653a0" strokeWidth="3" />
    </>
  ),
  memory: (
    <>
      <rect x="11" y="15" width="27" height="35" rx="7" fill="#f3a5cf" transform="rotate(-10 11 15)" />
      <rect x="30" y="12" width="24" height="36" rx="7" fill="#a5e9d8" transform="rotate(9 30 12)" />
      <path d="m39 24 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#fff" />
    </>
  ),
  "rock-paper-scissors": (
    <>
      <path d="M19 48V29a4 4 0 0 1 8 0v-9a4 4 0 0 1 8 0v7a4 4 0 0 1 8 0v4a4 4 0 0 1 8 0v10c0 8-5 13-14 13h-7c-5 0-8-2-11-6l-6-8a4 4 0 0 1 6-5l4 4" fill="#f5c46b" stroke="#b87b2e" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m18 15 28 31M47 15 19 46" stroke="#ed64a9" strokeWidth="3.5" strokeLinecap="round" opacity=".8" />
    </>
  ),
  berry: (
    <>
      <path d="M18 25c0-7 6-12 14-12s14 5 14 12c0 12-9 25-14 29-5-4-14-17-14-29Z" fill="#f26d87" />
      <path d="M32 17c-2-7-8-9-13-7 1 6 6 9 13 9 2-6 7-9 13-7-1 6-6 9-13 9" fill="#53b987" />
      <g fill="#ffe6a1"><circle cx="25" cy="27" r="1.5" /><circle cx="37" cy="27" r="1.5" /><circle cx="31" cy="34" r="1.5" /><circle cx="25" cy="39" r="1.5" /><circle cx="38" cy="39" r="1.5" /></g>
    </>
  ),
  frog: (
    <>
      <ellipse cx="32" cy="37" rx="19" ry="15" fill="#64c989" />
      <circle cx="22" cy="22" r="9" fill="#64c989" /><circle cx="42" cy="22" r="9" fill="#64c989" />
      <circle cx="22" cy="22" r="4" fill="#fff" /><circle cx="42" cy="22" r="4" fill="#fff" />
      <circle cx="23" cy="22" r="2" fill="#263a35" /><circle cx="41" cy="22" r="2" fill="#263a35" />
      <path d="M25 40q7 6 14 0" fill="none" stroke="#285b43" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  rainbow: (
    <>
      <path d="M12 46a20 20 0 0 1 40 0" fill="none" stroke="#f26d87" strokeWidth="7" strokeLinecap="round" />
      <path d="M18 46a14 14 0 0 1 28 0" fill="none" stroke="#f5bd59" strokeWidth="7" strokeLinecap="round" />
      <path d="M24 46a8 8 0 0 1 16 0" fill="none" stroke="#64c989" strokeWidth="7" strokeLinecap="round" />
      <path d="M11 49h42" stroke="#8479ca" strokeWidth="4" strokeLinecap="round" />
      <circle cx="14" cy="38" r="3" fill="#79c8ee" /><circle cx="50" cy="38" r="3" fill="#79c8ee" />
    </>
  ),
  pizza: (
    <>
      <path d="m10 17 44-7-18 46Z" fill="#f4c76d" stroke="#bf823a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m13 19 37-6" stroke="#e77863" strokeWidth="5" strokeLinecap="round" />
      <circle cx="29" cy="27" r="3.5" fill="#df6659" /><circle cx="40" cy="22" r="3.5" fill="#df6659" /><circle cx="34" cy="39" r="3.5" fill="#df6659" />
    </>
  ),
  butterfly: (
    <>
      <ellipse cx="21" cy="23" rx="11" ry="15" transform="rotate(-25 21 23)" fill="#a888ed" />
      <ellipse cx="43" cy="23" rx="11" ry="15" transform="rotate(25 43 23)" fill="#f28aba" />
      <ellipse cx="22" cy="43" rx="8" ry="11" transform="rotate(25 22 43)" fill="#70cfe0" />
      <ellipse cx="42" cy="43" rx="8" ry="11" transform="rotate(-25 42 43)" fill="#f5bd59" />
      <path d="M32 20v29m0-29q-5-9-9-8m9 8q5-9 9-8" fill="none" stroke="#473c69" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  melon: (
    <>
      <path d="M11 42a21 21 0 0 0 42 0Z" fill="#ed6e76" stroke="#4d9d70" strokeWidth="5" strokeLinejoin="round" />
      <path d="M14 42a18 18 0 0 0 36 0" fill="none" stroke="#a8d87d" strokeWidth="3" />
      <g fill="#49384a"><ellipse cx="24" cy="38" rx="1.7" ry="3" /><ellipse cx="32" cy="34" rx="1.7" ry="3" /><ellipse cx="40" cy="38" rx="1.7" ry="3" /></g>
    </>
  ),
  rock: (
    <>
      <path d="m13 39 5-16 12-10 15 6 7 15-8 15-19 2Z" fill="#a9a8b7" stroke="#68677a" strokeWidth="3" strokeLinejoin="round" />
      <path d="m22 27 9-9 10 3-7 7Zm-2 12 7-8 11 2-7 8Z" fill="#d3d1db" />
    </>
  ),
  paper: (
    <>
      <path d="M19 11h20l9 9v34H19Z" fill="#fff" stroke="#62bfa7" strokeWidth="3" strokeLinejoin="round" />
      <path d="M39 11v10h9M26 30h15M26 37h15M26 44h11" fill="none" stroke="#62bfa7" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  scissors: (
    <>
      <circle cx="20" cy="43" r="8" fill="none" stroke="#e685a5" strokeWidth="4" />
      <circle cx="20" cy="21" r="8" fill="none" stroke="#e685a5" strokeWidth="4" />
      <path d="m26 25 25 25M26 39l25-25M24 32h6" fill="none" stroke="#7264a5" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  ready: (
    <>
      <circle cx="32" cy="32" r="21" fill="#eee9fb" />
      <path d="M32 17v30M17 32h30" stroke="#9b8bc7" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="32" r="7" fill="#fff" />
    </>
  ),
};

function Artwork({ name, className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {artwork[name] || artwork.ready}
    </svg>
  );
}

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
              aria-label={isRevealed ? `${memoryLabels[face]}${matched.includes(index) ? ", matched" : ""}` : "Hidden card"}
            >
              {isRevealed ? <Artwork name={face} className="memory-artwork" /> : <span className="card-back-shape" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <p className="game-hint" aria-live="polite">
        {isComplete ? "Amazing memory! You found every pair!" : "Find all 6 matching pairs!"}
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
          <Artwork name={getChoice(round.player)?.artwork || "ready"} className="duel-artwork" />
          <span>You</span>
        </div>
        <strong className="versus">VS</strong>
        <div className="duel-side">
          <Artwork name={getChoice(round.computer)?.artwork || "ready"} className="duel-artwork" />
          <span>Computer</span>
        </div>
      </div>
      <p className="round-result" aria-live="polite">{round.result}</p>
      <div className="choice-row" aria-label="Choose rock, paper, or scissors">
        {choices.map((choice) => (
          <button className={`choice-button choice-${choice.id}`} key={choice.id} type="button" onClick={() => play(choice.id)}>
            <Artwork name={choice.artwork} className="choice-artwork" />
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
      <div className="shape shape-one" aria-hidden="true"><Artwork name="memory" /></div>
      <div className="shape shape-two" aria-hidden="true"><Artwork name="rainbow" /></div>

      <header className="topbar">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true"><Artwork name="butterfly" /></span>
          <span>PIXEL<span className="brand-highlight">POP</span></span>
        </div>
      </header>

      <section className="welcome">
        <p className="eyebrow"><span className="eyebrow-shape" aria-hidden="true" /> PICK YOUR HAPPY PLACE</p>
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
            <span className="tab-icon"><Artwork name={game.artwork} /></span>
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
          <span className="game-sticker"><Artwork name={currentGame.artwork} /></span>
        </div>
        {activeGame === "tic-tac-toe" && <TicTacToe />}
        {activeGame === "memory" && <MemoryMatch />}
        {activeGame === "rock-paper-scissors" && <RockPaperScissors />}
      </section>

      <footer className="page-footer">GOOD VIBES &amp; ONE MORE ROUND <span className="footer-shape" aria-hidden="true" /></footer>
    </main>
  );
}
