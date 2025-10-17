import { useState, useEffect } from 'react';
import Tile from './Tile';
import GameGrid from './GameGrid';
import { TileRegistryService } from '../services/tileRegistryService';
import type { TileData } from '../types/game';

interface GameBoardProps {
  grid: number[][];
  size: number;
}

const GameBoard = ({ grid, size }: GameBoardProps) => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const tileRegistry = TileRegistryService.getInstance();

  useEffect(() => {
    const newTiles: TileData[] = [];
    const currentPositions = new Set<string>();

    // Collect current positions and create tiles
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== 0) {
          const posKey = `${row}-${col}`;
          currentPositions.add(posKey);

          newTiles.push({
            id: tileRegistry.getTileId(row, col),
            value: grid[row][col],
            position: { row, col },
          });
        }
      }
    }

    // Clean up unused positions in registry
    tileRegistry.cleanupUnusedPositions(currentPositions);
    setTiles(newTiles);
  }, [grid, tileRegistry]);

  return (
    <div className="flex justify-center">
      <div className="relative">
        <GameGrid size={size} />
        
        {/* Animated Tiles Layer */}
        <div className="absolute top-3 left-3 w-full h-full">
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              id={tile.id}
              value={tile.value}
              row={tile.position.row}
              col={tile.position.col}
              gridSize={size}
              isNew={tile.isNew}
              isMerged={tile.isMerged}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;