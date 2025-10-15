import { useEffect, useRef, useCallback } from "react";

interface SwipeGesturesProps {
  onSwipe: (direction: string) => void;
  threshold?: number;
}

export const useSwipeGestures = ({
  onSwipe,
  threshold = 50,
}: SwipeGesturesProps) => {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isUpSwipe = distanceY > threshold;
    const isDownSwipe = distanceY < -threshold;

    // Determine if horizontal or vertical swipe is more significant
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe) {
        onSwipe("left");
      } else if (isRightSwipe) {
        onSwipe("right");
      }
    } else {
      if (isUpSwipe) {
        onSwipe("up");
      } else if (isDownSwipe) {
        onSwipe("down");
      }
    }
  }, [onSwipe, threshold]);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
};
