import Button from './ui/Button';
import Select from './ui/Select';
import { GAME_CONFIG, THEME_COLORS } from '../constants/game';

interface GameControlsProps {
  onRestart: () => void;
  size: number;
  onSizeChange: (size: number) => void;
}

const GameControls = ({ onRestart, size, onSizeChange }: GameControlsProps) => {
  const sizeOptions = Array.from(
    { length: GAME_CONFIG.MAX_SIZE - GAME_CONFIG.MIN_SIZE + 1 },
    (_, i) => {
      const value = GAME_CONFIG.MIN_SIZE + i;
      return { value, label: `${value}×${value}` };
    }
  );

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <div className="flex-1">
        <p className="text-sm leading-relaxed" style={{ color: THEME_COLORS.textPrimary }}>
          Join the numbers and get to the{" "}
          <strong className="font-bold">{GAME_CONFIG.WINNING_TILE} tile!</strong>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <Select
          options={sizeOptions}
          value={size}
          onChange={(value) => onSizeChange(Number(value))}
          className="flex-1 sm:flex-none min-w-[80px] sm:min-w-[100px]"
        />

        <Button
          onClick={onRestart}
          className="min-w-[80px] sm:min-w-[100px]"
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
