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
import { StorageService } from "./services/storageService";
import { THEME_COLORS, GAME_CONFIG } from "./constants/game";

function App() {
  const gameBoard = useGameBoard();
  const storageService = StorageService.getInstance();
  
  const [showGameEndScreen, setShowGameEndScreen] = useState(false);
  const [wonShow, setWonShow] = useState(false);
  const [bestScore, setBestScore] = useState(() => storageService.getBestScore());

  useEffect(() => {
    if (gameBoard.isGameOver) {
      setShowGameEndScreen(true);
    }
  }, [gameBoard.isGameOver]);

  useEffect(() => {
    if (gameBoard.hasWon && !wonShow) {
      setShowGameEndScreen(true);
      setWonShow(true);
    }
  }, [gameBoard.hasWon, wonShow]);

  useEffect(() => {
    if (gameBoard.score > bestScore) {
      setBestScore(gameBoard.score);
      storageService.setBestScore(gameBoard.score);
    }
  }, [gameBoard.score, bestScore, storageService]);

  return (
    <div 
      className="h-screen py-3 px-4 relative overflow-hidden"
      style={{ backgroundColor: THEME_COLORS.background }}
    >
      {showGameEndScreen && (
        <GameEndScreen
          terminated={gameBoard.isGameOver}
          won={gameBoard.hasWon}
          onClose={() => setShowGameEndScreen(false)}
          restartGame={gameBoard.restartGame}
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
              className="text-3xl sm:text-4xl md:text-5xl font-bold m-0"
              style={{ color: THEME_COLORS.textPrimary }}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {GAME_CONFIG.WINNING_TILE}
            </motion.h1>
            <HelpButton />
          </div>
          <ScoreBoard score={gameBoard.score} bestScore={bestScore} />
        </div>

        {/* Game Controls */}
        <div className="mb-3 flex-shrink-0">
          <GameControls
            onRestart={gameBoard.restartGame}
            size={gameBoard.size}
            onSizeChange={gameBoard.changeSize}
          />
        </div>

        {/* Game Board - Takes remaining space */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            key={gameBoard.size} // Re-animate when size changes
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GameBoard grid={gameBoard.grid} size={gameBoard.size} />
          </motion.div>
        </div>

        {/* Keyboard Controls */}
        <div className="flex-shrink-0">
          <KeyboardControls onMove={gameBoard.move} />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
