import { useEffect } from 'react';
import { GameState } from '@/types/game';

export const useGameTimer = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  isPaused: boolean
) => {
  useEffect(() => {
    if (gameState.gameOver || isPaused) return;

    const timer = setInterval(() => {
      setGameState((prev: GameState): GameState => {
        if (prev.timeLeft <= 0) {
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
  }, [gameState.gameOver, setGameState, isPaused]);
};