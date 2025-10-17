import { memo } from 'react';
import { THEME_COLORS } from '../constants/game';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

const ScoreBoard = memo(({ score, bestScore }: ScoreBoardProps) => {
  return (
    <div className="flex gap-2">
      <ScoreCard label="Score" value={score} />
      <ScoreCard label="Best" value={bestScore} />
    </div>
  );
});

interface ScoreCardProps {
  label: string;
  value: number;
}

const ScoreCard = ({ label, value }: ScoreCardProps) => {
  return (
    <div 
      className="px-3 py-2 rounded-lg text-center min-w-[60px]"
      style={{ backgroundColor: THEME_COLORS.buttonPrimary }}
    >
      <div className="text-xs font-bold text-white uppercase tracking-wide">
        {label}
      </div>
      <div className="text-lg font-bold text-white">
        {value.toLocaleString()}
      </div>
    </div>
  );
};

ScoreBoard.displayName = 'ScoreBoard';

export default ScoreBoard;