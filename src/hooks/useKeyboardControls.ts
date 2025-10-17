import { useEffect } from 'react';
import { KEYBOARD_MAPPINGS } from '../constants/game';
import type { Direction } from '../types/game';

interface UseKeyboardControlsProps {
  onMove: (direction: Direction) => void;
  disabled?: boolean;
}

export const useKeyboardControls = ({ onMove, disabled = false }: UseKeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      const direction = KEYBOARD_MAPPINGS[event.key as keyof typeof KEYBOARD_MAPPINGS];
      
      if (direction) {
        event.preventDefault();
        onMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMove, disabled]);
};