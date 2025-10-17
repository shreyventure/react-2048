import { GAME_CONFIG, DIRECTIONS } from '../constants/game';
import type { Direction, GameMove } from '../types/game';

export const createTestGrid = (size: number): number[][] => {
  let grid = Array.from({ length: size }, () => Array(size).fill(0));
  grid[0][0] = 1024
  grid[0][1] = 1024

  return grid;
};

export const createEmptyGrid = (size: number): number[][] => {
  let grid = Array.from({ length: size }, () => Array(size).fill(0));
  grid = spawnTile(grid).newGrid;
  grid = spawnTile(grid).newGrid;

  return grid;
};

export const spawnTile = (
  grid: number[][]
): { newGrid: number[][]; gameOver: boolean; won: boolean } => {
  const emptyCells: [number, number][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 0) {
        emptyCells.push([r, c]);
      }
    }
  }

  if (emptyCells.length === 0) {
    return { newGrid: grid, gameOver: true, won: false };
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const [row, col] = emptyCells[randomIndex];

  const newValue = Math.random() < GAME_CONFIG.NEW_TILE_PROBABILITY 
    ? GAME_CONFIG.NEW_TILE_VALUES[0] 
    : GAME_CONFIG.NEW_TILE_VALUES[1];

  const newGrid = grid.map((rowArr, r) =>
    rowArr.map((cell, c) => (r === row && c === col ? newValue : cell))
  );

  const { terminated, won } = isGameTerminated(newGrid);

  return { newGrid, gameOver: terminated, won };
};

const getVector = (direction: Direction) => {
  // Vectors representing tile movement
  switch (direction) {
    case DIRECTIONS.UP:
      return { x: 0, y: -1 };
    case DIRECTIONS.RIGHT:
      return { x: 1, y: 0 };
    case DIRECTIONS.DOWN:
      return { x: 0, y: 1 };
    case DIRECTIONS.LEFT:
      return { x: -1, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

export function updateGrid(grid: number[][], direction: Direction, size: number): GameMove {
  let score = 0;
  console.log("Updating table:");
  console.table(grid);
  const newGrid = grid.map((row) => [...row]);
  const merged: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );
  let moved = false;

  const vector = getVector(direction);

  // Determine traversal order
  const rows = [...Array(size).keys()];
  const cols = [...Array(size).keys()];

  if (direction === DIRECTIONS.RIGHT) cols.reverse();
  if (direction === DIRECTIONS.DOWN) rows.reverse();

  for (let r of rows) {
    for (let c of cols) {
      const value = newGrid[r][c];
      if (!value) continue;

      let newR = r;
      let newC = c;

      // Move until blocked
      while (
        newR + vector.y >= 0 &&
        newR + vector.y < size &&
        newC + vector.x >= 0 &&
        newC + vector.x < size &&
        newGrid[newR + vector.y][newC + vector.x] === 0
      ) {
        newR += vector.y;
        newC += vector.x;
      }

      // Try merging
      if (
        newR + vector.y >= 0 &&
        newR + vector.y < size &&
        newC + vector.x >= 0 &&
        newC + vector.x < size &&
        newGrid[newR + vector.y][newC + vector.x] === value &&
        !merged[newR + vector.y][newC + vector.x]
      ) {
        // Merge tiles
        newGrid[newR + vector.y][newC + vector.x] *= 2;
        score += newGrid[newR + vector.y][newC + vector.x];
        newGrid[r][c] = 0;
        merged[newR + vector.y][newC + vector.x] = true;
        moved = true;
      } else if (newR !== r || newC !== c) {
        // Just move tile
        newGrid[newR][newC] = value;
        newGrid[r][c] = 0;
        moved = true;
      }
    }
  }

  if (moved) {
    const { newGrid: withNewTile, gameOver, won } = spawnTile(newGrid);
    return { 
      direction, 
      newGrid: withNewTile, 
      gameOver, 
      won, 
      score 
    };
  }
  return { 
    direction, 
    newGrid, 
    gameOver: false, 
    won: false, 
    score 
  };
}

export const isGameTerminated = (
  grid: number[][]
): { terminated: boolean; won: boolean } => {
  const size = grid.length;
  let won = false;
  let hasEmpty = false;

  // Check for winning tile and empty cells
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === GAME_CONFIG.WINNING_TILE) {
        won = true;
      }
      if (grid[r][c] === 0) {
        hasEmpty = true;
      }
    }
  }

  // If there are empty cells, game isn't terminated yet
  if (hasEmpty) {
    return { terminated: false, won };
  }

  // Check for any possible merges (adjacent equal tiles)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const current = grid[r][c];
      const neighbors = [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1],
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (grid[nr][nc] === current) {
            return { terminated: false, won }; // merge possible
          }
        }
      }
    }
  }

  // No empty cells, no merges => game over
  return { terminated: true, won };
};
