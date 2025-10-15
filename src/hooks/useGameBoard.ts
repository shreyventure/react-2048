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
    let addScore = 0
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
      console.log("Current Score:", score, "add score:", currentScore);
      console.log("Add Score:", currentScore);
      addScore = currentScore
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

    setScore(prevScore => prevScore + addScore);
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

      // Handle both arrow keys and WASD keys
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        move("up");
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        move("down");
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        move("left");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        move("right");
      }
      // For all other keys, do nothing - let browser handle them normally
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
