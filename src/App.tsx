import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import GameEndScreen from "./components/GameEndScreen";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import GameControls from "./components/GameControls";
import KeyboardControls from "./components/KeyboardControls";
import HelpButton from "./components/HelpButton";
import useGameBoard from "./hooks/useGameBoard";

function App() {
  const { size, setSize, grid, score, gameTerminated, won, restartGame, move } =
    useGameBoard();

  const [showGameEndScreen, setShowGameEndScreen] = useState(false);
  const [wonShow, setWonShow] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("2048-best-score");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    if (gameTerminated) {
      setShowGameEndScreen(true);
    }
  }, [gameTerminated]);

  useEffect(() => {
    if (won && !wonShow) {
      setShowGameEndScreen(true);
      setWonShow(true);
    }
  }, [won]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("2048-best-score", score.toString());
    }
  }, [score, bestScore]);

  return (
    <div className="h-screen bg-[#faf8ef] py-3 px-4 relative overflow-hidden">
      {/* <HelpButton /> */}

      {showGameEndScreen && (
        <GameEndScreen
          terminated={gameTerminated}
          won={won}
          onClose={() => setShowGameEndScreen(false)}
          restartGame={restartGame}
        />
      )}

      <motion.div
        className="h-full max-w-2xl mx-auto flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 gap-2 flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#776e65] m-0"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >

              2048 
            </motion.h1>
            <HelpButton />
          </div>
          <ScoreBoard score={score} bestScore={bestScore} />
        </div>

        {/* Game Controls */}
        <div className="mb-3 flex-shrink-0">
          <GameControls
            onRestart={restartGame}
            size={size}
            onSizeChange={setSize}
          />
        </div>

        {/* Game Board - Takes remaining space */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            key={size} // Re-animate when size changes
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GameBoard grid={grid} size={size} />
          </motion.div>
        </div>

        {/* Keyboard Controls */}
        <div className="flex-shrink-0">
          <KeyboardControls onMove={move} />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
