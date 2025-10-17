import { memo } from 'react';
import { calculateTileSize, calculateTilePosition, getTileColors, calculateFontSize } from '../utils/tileUtils';
import { GAME_CONFIG } from '../constants/game';

interface TileProps {
  id: string;
  value: number;
  row: number;
  col: number;
  gridSize: number;
  isNew?: boolean;
  isMerged?: boolean;
}

const Tile = memo(({ value, row, col, gridSize, isNew, isMerged }: TileProps) => {
  const tileSize = calculateTileSize(gridSize);
  const { x, y } = calculateTilePosition(row, col, tileSize);
  const { background, text } = getTileColors(value);
  const fontSize = calculateFontSize(value, tileSize);

  const animationClass = isNew ? 'animate-tile-appear' : isMerged ? 'animate-tile-merge' : '';

  return (
    <div
      className={`tile absolute flex items-center justify-center font-bold rounded-lg select-none ${animationClass}`}
      style={{
        width: tileSize,
        height: tileSize,
        backgroundColor: background,
        color: text,
        fontSize,
        left: x,
        top: y,
        transition: `all ${GAME_CONFIG.ANIMATION_DURATION}ms ease-out`,
        zIndex: 10,
      }}
    >
      {value}
    </div>
  );
});

Tile.displayName = 'Tile';

export default Tile;
