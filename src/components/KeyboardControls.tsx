interface KeyboardControlsProps {
  onMove: (direction: string) => void;
}

const KeyboardControls = ({ onMove }: KeyboardControlsProps) => {
  const controls = [
    { direction: 'up', icon: '↑', label: 'Up' },
    { direction: 'down', icon: '↓', label: 'Down' },
    { direction: 'left', icon: '←', label: 'Left' },
    { direction: 'right', icon: '→', label: 'Right' },
  ];

  return (
    <div className="mt-6">
      <p className="text-center text-[#776e65] mb-4 font-medium">
        Use arrow keys or click the buttons below
      </p>
      
      <div className="flex justify-center gap-2">
        {controls.map(({ direction, icon, label }) => (
          <button
            key={direction}
            onClick={() => onMove(direction)}
            className="bg-[#8f7a66] text-white w-12 h-12 rounded-lg font-bold text-xl hover:bg-[#9f8a76] transition-colors flex items-center justify-center"
            title={`Move ${label}`}
          >
            {icon}
          </button>
        ))}
      </div>
      
      <div className="text-center mt-4 text-sm text-[#776e65]">
        <p><strong>HOW TO PLAY:</strong> Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!</p>
      </div>
    </div>
  );
};

export default KeyboardControls;