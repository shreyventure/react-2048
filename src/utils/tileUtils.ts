/**
 * Utility functions for tile calculations and styling
 */

import { TILE_COLORS } from '../constants/game';
import type { TileColors } from '../types/game';

export const calculateTileSize = (gridSize: number): number => {
  const baseSize = 350;
  const containerSize = Math.min(
    baseSize, 
    window.innerWidth - 60, 
    window.innerHeight - 250
  );
  const padding = 12;
  const totalPadding = padding * (gridSize + 1);
  return Math.floor((containerSize - totalPadding) / gridSize);
};

export const calculateTilePosition = (
  row: number, 
  col: number, 
  tileSize: number, 
  gap: number = 12
): { x: number; y: number } => {
  return {
    x: col * (tileSize + gap),
    y: row * (tileSize + gap),
  };
};

export const getTileColors = (value: number): TileColors => {
  return TILE_COLORS[value as keyof typeof TILE_COLORS] || TILE_COLORS.default;
};

export const calculateFontSize = (value: number, tileSize: number): number => {
  if (value >= 1024) return Math.max(tileSize * 0.3, 16);
  if (value >= 128) return Math.max(tileSize * 0.4, 20);
  return Math.max(tileSize * 0.5, 24);
};

export const calculateBoardSize = (gridSize: number, tileSize: number, gap: number = 12): number => {
  return gridSize * tileSize + (gridSize - 1) * gap;
};