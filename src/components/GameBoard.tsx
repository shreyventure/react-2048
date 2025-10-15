import AnimatedTile from './Tile';

interface GameBoardProps {
  grid: number[][];
  size: number;
}

const GameBoard = ({ grid, size }: GameBoardProps) => {

  const getTileSize = () => {
    const baseSize = 500;
    const containerSize = Math.min(baseSize, window.innerWidth - 80);
    const padding = 15;
    const totalPadding = padding * (size + 1);
    return Math.floor((containerSize - totalPadding) / size);
  };

  const tileSize = getTileSize();
  const gap = 15;
  const boardSize = size * tileSize + (size - 1) * gap;

  return (
    <div className="flex justify-center mb-8">
      {/* Background Grid */}
      <div
        className="relative bg-[#bbada0] rounded-xl p-4 shadow-lg"
        style={{
          width: boardSize + 30,
          height: boardSize + 30,
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
        <div className="absolute top-4 left-4 w-full h-full">
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