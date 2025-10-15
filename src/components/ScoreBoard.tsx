interface ScoreBoardProps {
  score: number;
  bestScore?: number;
}

const ScoreBoard = ({ score, bestScore }: ScoreBoardProps) => {
  return (
    <div className="flex gap-3 justify-center sm:justify-end">
      <div className="bg-[#bbada0] text-white px-4 sm:px-6 py-3 rounded-lg text-center min-w-[80px] sm:min-w-[100px]">
        <div className="text-xs uppercase font-bold text-[#eee4da] mb-1">
          Score
        </div>
        <div className="text-xl sm:text-2xl font-bold">
          {score.toLocaleString()}
        </div>
      </div>

      {bestScore !== undefined && (
        <div className="bg-[#bbada0] text-white px-4 sm:px-6 py-3 rounded-lg text-center min-w-[80px] sm:min-w-[100px]">
          <div className="text-xs uppercase font-bold text-[#eee4da] mb-1">
            Best
          </div>
          <div className="text-xl sm:text-2xl font-bold">
            {bestScore.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
