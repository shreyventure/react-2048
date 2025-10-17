import { DIRECTIONS, THEME_COLORS, GAME_CONFIG } from '../constants/game';
import type { Direction } from '../types/game';

interface KeyboardControlsProps {
  onMove: (direction: Direction) => void;
}

const KeyboardControls = ({ onMove }: KeyboardControlsProps) => {
  const controls = [
    { direction: DIRECTIONS.UP as Direction, icon: "↑", label: "Up" },
    { direction: DIRECTIONS.DOWN as Direction, icon: "↓", label: "Down" },
    { direction: DIRECTIONS.LEFT as Direction, icon: "←", label: "Left" },
    { direction: DIRECTIONS.RIGHT as Direction, icon: "→", label: "Right" },
  ];

  return (
    <div className="mt-2">
      <p 
        className="text-center mb-2 font-medium text-sm"
        style={{ color: THEME_COLORS.textPrimary }}
      >
        Use arrow keys, WASD keys, or click buttons
      </p>

      <div className="flex justify-center gap-2 mb-2">
        {controls.map(({ direction, icon, label }) => (
          <button
            key={direction}
            onClick={() => onMove(direction)}
            className="text-white w-10 h-10 rounded-lg font-bold text-lg transition-colors flex items-center justify-center"
            style={{ 
              backgroundColor: THEME_COLORS.buttonPrimary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = THEME_COLORS.buttonHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = THEME_COLORS.buttonPrimary;
            }}
            title={`Move ${label}`}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="text-center text-xs" style={{ color: THEME_COLORS.textPrimary }}>
        <p>
          <strong>HOW TO PLAY:</strong> Move tiles to merge same numbers and reach {GAME_CONFIG.WINNING_TILE}!
        </p>
      </div>
    </div>
  );
};

export default KeyboardControls;
