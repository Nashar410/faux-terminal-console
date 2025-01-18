import React from 'react';
import { GameState } from '@/types/game';
import { sprites } from '@/assets/gameSprites';

type GameOverlayProps = {
  gameState: GameState;
  timeLeft: number;
};

export const GameOverlay: React.FC<GameOverlayProps> = ({ gameState, timeLeft }) => {
  return (
    <>
      <div className="flex justify-between mb-4 text-terminal-text">
        <div className="text-xl font-mono">
          Temps restant: {timeLeft}s
        </div>
        {gameState.firecracker.collected && (
          <div className="flex items-center gap-2">
            <span>Inventaire:</span>
            <div className="w-8 h-8">
              <sprites.firecracker />
            </div>
          </div>
        )}
      </div>

      {gameState.gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90">
          <div className="text-terminal-text text-2xl animate-pulse">
            {gameState.message}
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-2 text-terminal-text text-sm">
        Utilisez les flèches ou WASD pour vous déplacer
      </div>
    </>
  );
};