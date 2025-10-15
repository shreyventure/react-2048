import AnimatedTile from './Tile';

interface GameBoardProps {
  grid: number[][];
  size: number;
}

const GameBoard = ({ grid, size }: GameBoardProps) => {

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
          {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              if (value === 0) return null;
              return (
                <AnimatedTile
                  key={`${rowIndex}-${colIndex}`}
                  id={`${rowIndex}-${colIndex}`}
                  value={value}
                  row={rowIndex}
                  col={colIndex}
                  size={size}
                />
              );
            })
          )}
        </div>


      </div>
    </div>
  );
};

export default GameBoard;