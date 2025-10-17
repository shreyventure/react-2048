import { memo } from 'react';
import { calculateTileSize, calculateBoardSize } from '../utils/tileUtils';
import { THEME_COLORS } from '../constants/game';

interface GameGridProps {
  size: number;
}

const GameGrid = memo(({ size }: GameGridProps) => {
  const tileSize = calculateTileSize(size);
  const gap = 12;
  const boardSize = calculateBoardSize(size, tileSize, gap);

  return (
    <div
      className="relative rounded-xl p-3 shadow-lg"
      style={{
        backgroundColor: THEME_COLORS.boardBackground,
        width: boardSize + 24,
        height: boardSize + 24,
      }}
    >
      <div 
        className="grid relative z-0"
        style={{ 
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gap: `${gap}px`
        }}
      >
        {Array.from({ length: size * size }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg"
            style={{
              backgroundColor: THEME_COLORS.cellBackground,
              width: tileSize,
              height: tileSize,
            }}
          />
        ))}
      </div>
    </div>
  );
});

GameGrid.displayName = 'GameGrid';

export default GameGrid;