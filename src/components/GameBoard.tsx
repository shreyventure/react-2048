import { useState, useEffect } from 'react';
import AnimatedTile from './Tile';

interface TileData {
  id: string;
  value: number;
  row: number;
  col: number;
}

interface GameBoardProps {
  grid: number[][];
  size: number;
}

// Simple tile registry for stable IDs
const tileRegistry = new Map<string, string>();
let tileIdCounter = 0;

const GameBoard = ({ grid, size }: GameBoardProps) => {
  const [tiles, setTiles] = useState<TileData[]>([]);

  // Update tiles when grid changes
  useEffect(() => {
    const newTiles: TileData[] = [];
    const currentPositions = new Set<string>();

    // Collect current positions
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== 0) {
          currentPositions.add(`${row}-${col}`);
        }
      }
    }

    // Create tiles with stable IDs
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== 0) {
          const posKey = `${row}-${col}`;
          
          // Get or create stable ID for this position
          if (!tileRegistry.has(posKey)) {
            tileRegistry.set(posKey, `tile-${tileIdCounter++}`);
          }

          newTiles.push({
            id: tileRegistry.get(posKey)!,
            value: grid[row][col],
            row,
            col,
          });
        }
      }
    }

    // Clean up unused positions
    for (const [posKey] of tileRegistry) {
      if (!currentPositions.has(posKey)) {
        tileRegistry.delete(posKey);
      }
    }

    setTiles(newTiles);
  }, [grid]);

  const getTileSize = () => {
    // Smaller base size to fit in viewport
    const baseSize = 350;
    const containerSize = Math.min(baseSize, window.innerWidth - 60, window.innerHeight - 250);
    const padding = 12;
    const totalPadding = padding * (size + 1);
    return Math.floor((containerSize - totalPadding) / size);
  };

  const tileSize = getTileSize();
  const gap = 12;
  const boardSize = size * tileSize + (size - 1) * gap;

  return (
    <div className="flex justify-center">
      {/* Background Grid */}
      <div
        className="relative bg-[#bbada0] rounded-xl p-3 shadow-lg"
        style={{
          width: boardSize + 24,
          height: boardSize + 24,
        }}
      >
        {/* Grid cells background */}
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
              className="bg-[rgba(238,228,218,0.35)] rounded-lg"
              style={{
                width: tileSize,
                height: tileSize,
              }}
            />
          ))}
        </div>

        {/* Animated Tiles */}
        <div className="absolute top-3 left-3 w-full h-full">
          {tiles.map((tile) => (
            <AnimatedTile
              key={tile.id}
              id={tile.id}
              value={tile.value}
              row={tile.row}
              col={tile.col}
              size={size}
            />
          ))}
        </div>


      </div>
    </div>
  );
};

export default GameBoard;