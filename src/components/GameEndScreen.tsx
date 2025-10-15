import { motion, AnimatePresence } from 'framer-motion';

interface GameEndScreenProps {
  terminated: boolean;
  won: boolean;
  onClose: () => void;
  restartGame: () => void;
}

const GameEndScreen = ({ terminated, won, onClose, restartGame }: GameEndScreenProps) => {
  const handleRestart = () => {
    onClose();
    restartGame();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        {/* Modal */}
        <motion.div
          className={`relative bg-white rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4 ${
            won ? 'border-4 border-yellow-400' : 'border-4 border-red-400'
          }`}
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <motion.button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-4">
              {won ? '🎉' : '😔'}
            </div>
            
            <h2 className={`text-4xl font-bold mb-4 ${
              won ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {won ? 'Congratulations!' : 'Game Over'}
            </h2>
            
            <p className="text-gray-600 mb-6 text-lg">
              {won 
                ? 'You reached the 2048 tile! Amazing work!' 
                : 'No more moves available. Better luck next time!'
              }
            </p>

            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={handleRestart}
                className={`px-6 py-3 rounded-lg font-bold text-white ${
                  won ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
              
              {(won && !terminated) && (
                <motion.button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg font-bold text-yellow-600 border-2 border-yellow-500 hover:bg-yellow-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Keep Playing
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameEndScreen;
