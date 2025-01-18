import { useEffect } from 'react';
import { GameState } from '@/types/game';

export const useGameTimer = (
  gameState: GameState,
  setGameState: (state: GameState) => void
) => {
  useEffect(() => {
    if (gameState.gameOver) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 0) {
          clearInterval(timer);
          return {
            ...prev,
            gameOver: true,
            message: "Le temps est écoulé !",
            endingMessage: 'ouest'
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameOver, setGameState]);
};