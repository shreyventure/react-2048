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
  const [wonShow, setWonShow] = useState(false)
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('2048-best-score');
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
      setWonShow(true)
    }
  }, [won]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('2048-best-score', score.toString());
    }
  }, [score, bestScore]);

  return (
    <div className="min-h-screen bg-[#faf8ef] py-8 px-4 relative">
      <HelpButton />
      
      {showGameEndScreen && (
        <GameEndScreen
          terminated={gameTerminated}
          won={won}
          onClose={() => setShowGameEndScreen(false)}
          restartGame={restartGame}
        />
      )}
      
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <motion.h1 
            className="text-5xl sm:text-7xl font-bold text-[#776e65] m-0"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            2048
          </motion.h1>
          <ScoreBoard score={score} bestScore={bestScore} />
        </div>

        {/* Game Controls */}
        <GameControls 
          onRestart={restartGame}
          size={size}
          onSizeChange={setSize}
        />

        {/* Game Board */}
        <motion.div
          key={size} // Re-animate when size changes
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <GameBoard grid={grid} size={size} />
        </motion.div>

        {/* Keyboard Controls */}
        <KeyboardControls onMove={move} />
      </motion.div>
    </div>
  );
}

export default App;
