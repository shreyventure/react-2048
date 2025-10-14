const GameEndScreen = ({
  won,
  onClose,
  restartGame,
}: {
  won: boolean;
  onClose: () => void;
  restartGame: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-yellow-500 bg-opacity-80 flex items-center justify-center z-50">
      <h1 className="text-4xl font-bold text-green-500">
        {won ? "You Won! 🥳" : "Game Over"}
      </h1>
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={() => {
          onClose();
          restartGame();
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default GameEndScreen;
