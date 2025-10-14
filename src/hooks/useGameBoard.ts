import { useEffect, useState } from "react";
import {
  createEmptyGrid,
  updateGrid,
  isGameTerminated,
} from "../utils/gameLogic";

const useGameBoard = () => {
  const [size, setSize] = useState(3);
  const [grid, setGrid] = useState(createEmptyGrid(3));
  const [score, setScore] = useState(0);
  const [gameTerminated, setGameTerminated] = useState(false);
  const [won, setWon] = useState(false);

  const move = (direction: string) => {
    console.log("moving:", direction);

    setGrid((prevGrid) => {
      let terminationState = isGameTerminated(grid);
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

    // setScore((prevScore) => prevScore + 1);
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
      e.preventDefault();
      if (e.key === "ArrowUp") move("up");
      else if (e.key === "ArrowDown") move("down");
      else if (e.key === "ArrowLeft") move("left");
      else if (e.key === "ArrowRight") move("right");
      else return;
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return {
    size,
    setSize,
    grid,
    setGrid,
    move,
    score,
    setScore,
    gameTerminated,
    won,
    restartGame,
  };
};

export default useGameBoard;
