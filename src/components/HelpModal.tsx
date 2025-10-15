import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            ×
          </button>

          {/* Content */}
          <div className="pr-8">
            <h2 className="text-3xl font-bold text-[#776e65] mb-6">How to Play 2048</h2>
            
            {/* Game Objective */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-[#776e65] mb-3">🎯 Objective</h3>
              <p className="text-gray-700 leading-relaxed">
                Combine tiles with the same numbers to reach the <strong className="text-[#edc22e]">2048 tile</strong>! 
                Keep playing to achieve even higher scores.
              </p>
            </section>

            {/* Controls */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-[#776e65] mb-3">🎮 Controls</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Keyboard</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><kbd className="bg-gray-200 px-2 py-1 rounded text-xs">↑ ↓ ← →</kbd> Arrow Keys</li>
                    <li><kbd className="bg-gray-200 px-2 py-1 rounded text-xs">W A S D</kbd> WASD Keys</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Other</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>🖱️ Click arrow buttons</li>
                    <li>📱 Swipe on mobile</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Play */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-[#776e65] mb-3">📖 How to Play</h3>
              <ol className="text-gray-700 leading-relaxed space-y-2">
                <li><strong>1.</strong> Use arrow keys or WASD to move tiles in any direction</li>
                <li><strong>2.</strong> When two tiles with the same number touch, they merge into one</li>
                <li><strong>3.</strong> After each move, a new tile (2 or 4) appears randomly</li>
                <li><strong>4.</strong> Try to create a tile with the number 2048 to win!</li>
                <li><strong>5.</strong> Game ends when the board is full and no moves are possible</li>
              </ol>
            </section>

            {/* Tips & Tricks */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-[#776e65] mb-3">💡 Tips & Tricks</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-800 mb-1">Keep your highest tile in a corner</h4>
                  <p className="text-blue-700 text-sm">Choose one corner and try to keep your highest value tile there. This creates a more organized board.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800 mb-1">Build in one direction</h4>
                  <p className="text-green-700 text-sm">Focus on building tiles in rows or columns rather than scattered across the board.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 mb-1">Don't fill up the board</h4>
                  <p className="text-yellow-700 text-sm">Always try to keep some empty spaces available for new tiles to spawn.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold text-purple-800 mb-1">Plan ahead</h4>
                  <p className="text-purple-700 text-sm">Think about where tiles will move before making your move. Sometimes the best move isn't obvious!</p>
                </div>
              </div>
            </section>

            {/* Scoring */}
            <section className="mb-4">
              <h3 className="text-xl font-semibold text-[#776e65] mb-3">🏆 Scoring</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Your score increases each time tiles merge. The points you get equal the value of the new tile created.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Merging two 64 tiles creates a 128 tile and adds 128 points to your score.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HelpModal;