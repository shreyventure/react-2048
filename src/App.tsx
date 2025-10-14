import { useEffect, useState } from "react";
import "./App.css";
import GameEndScreen from "./components/GameEndScreen";
import useGameBoard from "./hooks/useGameBoard";

function App() {
  const { size, setSize, grid, score, gameTerminated, won } = useGameBoard();

  const [showGameEndScreen, setShowGameEndScreen] = useState(false);

  useEffect(() => {
    if (gameTerminated) {
      setShowGameEndScreen(true);
    }
  }, [gameTerminated]);

  return (
    <div className="container">
      {showGameEndScreen && (
        <GameEndScreen won={won} onClose={() => setShowGameEndScreen(false)} />
      )}
      <div className="heading">
        <h1 className="title">2048</h1>
        <div className="scores-container">
          <div className="score-container">{score}</div>
        </div>
      </div>

      <div className="above-game">
        <p className="game-intro">
          Join the numbers and get to the <strong>2048 tile!</strong>
        </p>
        <a className="restart-button">New Game</a>
      </div>

      <div className="border flex justify-between">
        <label htmlFor="grid-size" className="p-2">
          Grid Size:
        </label>
        <select
          name="grid-size"
          id="grid-size"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        >
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </div>

      <div className="game-container">
        <div className="grid-container">
          {grid.map((row, rowIndex) => (
            // flex container for each row, with some padding between elements
            <div key={rowIndex} className="grid-row">
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className="grid-cell">
                  <div className={`tile tile-${cell}`}>
                    <div className="tile-inner">{cell}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* <button onClick={() => setScore((prev) => prev + 1)}>Reset Game</button> */}
    </div>
  );
}

export default App;
