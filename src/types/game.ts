/**
 * Core game types and interfaces
 */

export interface Position {
  row: number;
  col: number;
}

export interface TileData {
  id: string;
  value: number;
  position: Position;
  isNew?: boolean;
  isMerged?: boolean;
  previousPosition?: Position;
}

export interface GameState {
  grid: number[][];
  score: number;
  bestScore: number;
  size: number;
  isGameOver: boolean;
  hasWon: boolean;
  isPlaying: boolean;
}

export interface GameMove {
  direction: Direction;
  newGrid: number[][];
  score: number;
  gameOver: boolean;
  won: boolean;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameConfig {
  defaultSize: number;
  minSize: number;
  maxSize: number;
  winningTile: number;
  newTileValues: number[];
  newTileProbabilities: number[];
  animationDuration: number;
  localStorageKey: string;
}

export interface TileColors {
  background: string;
  text: string;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  bestScore: number;
  totalScore: number;
}