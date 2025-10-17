import { useEffect, useState, useCallback } from "react";
import {
  createEmptyGrid,
  updateGrid,
  isGameTerminated,
} from "../utils/gameLogic";
import { useSwipeGestures } from "./useSwipeGestures";
import { TileRegistryService } from "../services/tileRegistryService";
import { GAME_CONFIG, KEYBOARD_MAPPINGS } from "../constants/game";
import type { Direction, GameState } from "../types/game";

const useGameBoard = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(GAME_CONFIG.DEFAULT_SIZE),
    score: 0,
    bestScore: 0,
    size: GAME_CONFIG.DEFAULT_SIZE,
    isGameOver: false,
    hasWon: false,
    isPlaying: true,
  });

  const tileRegistry = TileRegistryService.getInstance();

  const move = useCallback((direction: Direction) => {
    setGameState((prevState) => {
      if (prevState.isGameOver) return prevState;

      const terminationState = isGameTerminated(prevState.grid);
      if (terminationState.terminated) {
        return {
          ...prevState,
          isGameOver: true,
          hasWon: terminationState.won,
        };
      }

      const gameMove = updateGrid(prevState.grid, direction, prevState.size);

      return {
        ...prevState,
        grid: gameMove.newGrid,
        score: prevState.score + gameMove.score,
        isGameOver: gameMove.gameOver,
        hasWon: prevState.hasWon || gameMove.won,
      };
    });
  }, []);

  const restartGame = useCallback(() => {
    tileRegistry.reset();
    setGameState((prevState) => ({
      ...prevState,
      grid: createEmptyGrid(prevState.size),
      score: 0,
      isGameOver: false,
      hasWon: false,
      isPlaying: true,
    }));
  }, [tileRegistry]);

  const changeSize = useCallback(
    (newSize: number) => {
      if (newSize < GAME_CONFIG.MIN_SIZE || newSize > GAME_CONFIG.MAX_SIZE) {
        return;
      }

      tileRegistry.reset();
      setGameState((prevState) => ({
        ...prevState,
        size: newSize,
        grid: createEmptyGrid(newSize),
        score: 0,
        isGameOver: false,
        hasWon: false,
        isPlaying: true,
      }));
    },
    [tileRegistry]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      const direction =
        KEYBOARD_MAPPINGS[event.key as keyof typeof KEYBOARD_MAPPINGS];

      if (direction) {
        event.preventDefault();
        move(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move, gameState.isGameOver]);

  // Swipe gesture support
  useSwipeGestures({
    onSwipe: (direction: Direction) => {
      if (!gameState.isGameOver) {
        move(direction);
      }
    },
  });

  return {
    ...gameState,
    move,
    restartGame,
    changeSize,
  };
};

export default useGameBoard;
