interface KeyboardControlsProps {
  onMove: (direction: string) => void;
}

const KeyboardControls = ({ onMove }: KeyboardControlsProps) => {
  const controls = [
    { direction: "up", icon: "↑", label: "Up" },
    { direction: "down", icon: "↓", label: "Down" },
    { direction: "left", icon: "←", label: "Left" },
    { direction: "right", icon: "→", label: "Right" },
  ];

  return (
    <div className="mt-2">
      <p className="text-center text-[#776e65] mb-2 font-medium text-sm">
        Use arrow keys, WASD keys, or click buttons
      </p>

      <div className="flex justify-center gap-2 mb-2">
        {controls.map(({ direction, icon, label }) => (
          <button
            key={direction}
            onClick={() => onMove(direction)}
            className="bg-[#8f7a66] text-white w-10 h-10 rounded-lg font-bold text-lg hover:bg-[#9f8a76] transition-colors flex items-center justify-center"
            title={`Move ${label}`}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="text-center text-xs text-[#776e65]">
        <p>
          <strong>HOW TO PLAY:</strong> Move tiles to merge same numbers and reach 2048!
        </p>
      </div>
    </div>
  );
};

export default KeyboardControls;
