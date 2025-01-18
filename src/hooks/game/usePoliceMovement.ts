import { useEffect } from 'react';
import { GameState } from '@/types/game';

export const usePoliceMovement = (
  gameState: GameState,
  setGameState: (state: GameState) => void
) => {
  useEffect(() => {
    if (gameState.gameOver) return;

    const moveInterval = setInterval(() => {
      setGameState(prev => {
        const newY = prev.police.movingDown
          ? prev.police.y + 1
          : prev.police.y - 1;

        const shouldChangeDirection =
          (prev.police.movingDown && newY >= 80) ||
          (!prev.police.movingDown && newY <= 20);

        return {
          ...prev,
          police: {
            ...prev.police,
            y: shouldChangeDirection ? prev.police.y : newY,
            movingDown: shouldChangeDirection ? !prev.police.movingDown : prev.police.movingDown,
            frame: (prev.police.frame + 1) % 2
          }
        };
      });
    }, 100);

    return () => clearInterval(moveInterval);
  }, [gameState.gameOver, setGameState]);
};