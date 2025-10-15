interface GameControlsProps {
  onRestart: () => void;
  size: number;
  onSizeChange: (size: number) => void;
}

const GameControls = ({ onRestart, size, onSizeChange }: GameControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <div className="flex-1">
        <p className="text-[#776e65] text-sm leading-relaxed">
          Join the numbers and get to the{" "}
          <strong className="font-bold">2048 tile!</strong>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        <div className="flex items-center">
          <select
            name="grid-size"
            id="grid-size"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="bg-[#8f7a66] text-white px-4 py-2 text-sm rounded-lg border-none outline-none cursor-pointer flex-1 sm:flex-none"
          >
            <option value={2}>2×2</option>
            <option value={3}>3×3</option>
            <option value={4}>4×4</option>
            <option value={5}>5×5</option>
            <option value={6}>6×6</option>
          </select>
        </div>

        <button
          onClick={onRestart}
          className="bg-[#8f7a66] text-white px-4 py-2 text-sm rounded-lg font-bold hover:bg-[#9f8a76] transition-colors"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;
