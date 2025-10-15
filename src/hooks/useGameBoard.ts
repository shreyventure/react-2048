import { useEffect, useState } from "react";
import {
  createEmptyGrid,
  updateGrid,
  isGameTerminated,
} from "../utils/gameLogic";
import { useSwipeGestures } from "./useSwipeGestures";

const useGameBoard = () => {
  const [size, setSize] = useState(4);
  const [grid, setGrid] = useState(createEmptyGrid(4));
  const [score, setScore] = useState(0);
  const [gameTerminated, setGameTerminated] = useState(false);
  const [won, setWon] = useState(false);

  const move = (direction: string) => {
    console.log("moving:", direction);

    setGrid((prevGrid) => {
      let terminationState = isGameTerminated(prevGrid);
      console.log("Termination State:", terminationState);
      if (terminationState.terminated) {
        console.log("Game already terminated");
        setGameTerminated(true);
        setWon(terminationState.won);
        return prevGrid;
      }
      const { newGrid, gameOver, won, currentScore } = updateGrid(
        prevGrid,
        direction,
        prevGrid.length
      );
      console.log("Current Score:", currentScore);
      setScore((prevScore) => prevScore + (currentScore ?? 0));
      console.log("New Grid:");
      console.table(newGrid);
      if (gameOver) {
        console.log("Game over");
        setGameTerminated(true);
      }
      if (won) {
        console.log("You won!");
        setWon(true);
      }
      return newGrid;
    });
  };

  const restartGame = () => {
    setGrid(createEmptyGrid(size));
    setScore(0);
    setGameTerminated(false);
    setWon(false);
  };

  useEffect(() => {
    setGrid(createEmptyGrid(size));
    console.log("changing size:", size);
  }, [size]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameTerminated) return;

      e.preventDefault();
      if (e.key === "ArrowUp") move("up");
      else if (e.key === "ArrowDown") move("down");
      else if (e.key === "ArrowLeft") move("left");
      else if (e.key === "ArrowRight") move("right");
      else return;
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameTerminated]);

  // Add swipe gesture support
  useSwipeGestures({
    onSwipe: (direction: string) => {
      if (!gameTerminated) {
        move(direction);
      }
    },
  });

  return {
    size,
    setSize,
    grid,
    move,
    score,
    gameTerminated,
    won,
    restartGame,
  };
};

export default useGameBoard;
