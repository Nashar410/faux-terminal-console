import { useEffect } from 'react';
import { GameState } from '@/types/game';

export const usePoliceMovement = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  isPaused: boolean
) => {
  useEffect(() => {
    if (gameState.gameOver || isPaused) return;

    const moveInterval = setInterval(() => {
      setGameState((prev: GameState): GameState => {
        const newY = prev.police.movingDown
          ? prev.police.y + 1.5
          : prev.police.y - 1.5;

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
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameState.gameOver, setGameState, isPaused]);
};