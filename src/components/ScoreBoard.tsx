import { motion } from "framer-motion";

interface ScoreBoardProps {
  score: number;
  bestScore?: number;
}

const ScoreBoard = ({ score, bestScore }: ScoreBoardProps) => {
  return (
    <div className="flex gap-3 justify-center sm:justify-end">
      <motion.div
        className="bg-[#bbada0] text-white px-4 sm:px-6 py-3 rounded-lg text-center min-w-[80px] sm:min-w-[100px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-xs uppercase font-bold text-[#eee4da] mb-1">
          Score
        </div>
        <motion.div
          className="text-xl sm:text-2xl font-bold"
          key={score}
          initial={{ scale: 1.2, color: "#f59563" }}
          animate={{ scale: 1, color: "#ffffff" }}
          transition={{ duration: 0.2 }}
        >
          {score.toLocaleString()}
        </motion.div>
      </motion.div>

      {bestScore !== undefined && (
        <motion.div
          className="bg-[#bbada0] text-white px-4 sm:px-6 py-3 rounded-lg text-center min-w-[80px] sm:min-w-[100px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-xs uppercase font-bold text-[#eee4da] mb-1">
            Best
          </div>
          <div className="text-xl sm:text-2xl font-bold">
            {bestScore.toLocaleString()}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScoreBoard;
