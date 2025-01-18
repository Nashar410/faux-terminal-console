import { useState, useEffect } from 'react';
import { GameState } from '@/types/game';

export const usePlayerMovement = (
  gameState: GameState,
  showGame: boolean,
  movePlayer: (newX: number, newY: number, direction: 'left' | 'right' | 'idle') => void
) => {
  useEffect(() => {
    if (!showGame) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const speed = 2;
      let newX = gameState.playerX;
      let newY = gameState.playerY;
      let direction: 'left' | 'right' | 'idle' = 'idle';

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX = Math.max(0, gameState.playerX - speed);
          direction = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX = Math.min(100, gameState.playerX + speed);
          direction = 'right';
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          newY = Math.max(0, gameState.playerY - speed);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newY = Math.min(100, gameState.playerY + speed);
          break;
      }

      if (newX !== gameState.playerX || newY !== gameState.playerY) {
        movePlayer(newX, newY, direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGame, gameState.playerX, gameState.playerY, movePlayer]);
};