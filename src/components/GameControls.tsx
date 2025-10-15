import { motion } from 'framer-motion';

interface GameControlsProps {
  onRestart: () => void;
  size: number;
  onSizeChange: (size: number) => void;
}

const GameControls = ({ onRestart, size, onSizeChange }: GameControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div className="flex-1">
        <p className="text-[#776e65] text-base sm:text-lg leading-relaxed">
          Join the numbers and get to the <strong className="font-bold">2048 tile!</strong>
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <label htmlFor="grid-size" className="text-[#776e65] font-medium whitespace-nowrap">
            Size:
          </label>
          <motion.select
            name="grid-size"
            id="grid-size"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="bg-[#8f7a66] text-white px-3 py-2 rounded-lg border-none outline-none cursor-pointer flex-1 sm:flex-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <option value={2}>2×2</option>
            <option value={3}>3×3</option>
            <option value={4}>4×4</option>
            <option value={5}>5×5</option>
            <option value={6}>6×6</option>
          </motion.select>
        </div>
        
        <motion.button
          onClick={onRestart}
          className="bg-[#8f7a66] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#9f8a76] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </motion.button>
      </div>
    </div>
  );
};

export default GameControls;