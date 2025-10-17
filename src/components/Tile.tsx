import { memo } from "react";

interface TileProps {
  id: string;
  value: number;
  row: number;
  col: number;
  size: number;
}

const AnimatedTile = memo(({ value, row, col, size }: TileProps) => {
  const getTileSize = () => {
    // Same calculation as GameBoard
    const baseSize = 350;
    const containerSize = Math.min(baseSize, window.innerWidth - 60, window.innerHeight - 250);
    const padding = 12;
    const totalPadding = padding * (size + 1);
    return Math.floor((containerSize - totalPadding) / size);
  };

  const tileSize = getTileSize();
  const gap = 12;

  const x = col * (tileSize + gap);
  const y = row * (tileSize + gap);

  const getTileColor = (value: number) => {
    const colors: { [key: number]: { bg: string; text: string } } = {
      2: { bg: "#eee4da", text: "#776e65" },
      4: { bg: "#ede0c8", text: "#776e65" },
      8: { bg: "#f2b179", text: "#f9f6f2" },
      16: { bg: "#f59563", text: "#f9f6f2" },
      32: { bg: "#f67c5f", text: "#f9f6f2" },
      64: { bg: "#f65e3b", text: "#f9f6f2" },
      128: { bg: "#edcf72", text: "#f9f6f2" },
      256: { bg: "#edcc61", text: "#f9f6f2" },
      512: { bg: "#edc850", text: "#f9f6f2" },
      1024: { bg: "#edc53f", text: "#f9f6f2" },
      2048: { bg: "#edc22e", text: "#f9f6f2" },
    };
    return colors[value] || { bg: "#3c3a32", text: "#f9f6f2" };
  };

  const { bg, text } = getTileColor(value);

  const getFontSize = () => {
    if (value >= 1024) return Math.max(tileSize * 0.3, 16);
    if (value >= 128) return Math.max(tileSize * 0.4, 20);
    return Math.max(tileSize * 0.5, 24);
  };

  return (
    <div
      className="tile absolute flex items-center justify-center font-bold rounded-lg select-none"
      style={{
        width: tileSize,
        height: tileSize,
        backgroundColor: bg,
        color: text,
        fontSize: getFontSize(),
        left: x,
        top: y,
        transition: 'all 0.3s ease-out',
        zIndex: 10,
      }}
    >
      {value}
    </div>
  );
});

AnimatedTile.displayName = "AnimatedTile";

export default AnimatedTile;
